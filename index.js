export default class extends Date
{
  constructor(...args)
  {
    super(...args)
    Object.defineProperty(this, 'config', { value : new Config })
  }

  /**
   * @param {Date} date Date to calculate the difference from.
   * @returns {string} The relative time difference.
   */
  timeDifference(date)
  {
    if(false === (date instanceof Date))
    {
      date = new Date(date)
    }

    if(isNaN(date))
    {
      const error = new Error('Invalid date argument')
      error.code  = 'E_DATE_INVALID_ARGUMENT'
      error.cause = 'The date argument must be an instance of a valid Date object'
      error.date  = date
      throw error
    }

    const { localeMatcher, style, numeric, quarter, week } = this.config
    const
      relativeTime  = new Intl.RelativeTimeFormat(this.config.locale, { localeMatcher, style, numeric }),
      diff          = date - this,
      unitMap       =
      {
        'year'    : 31536e6,
        'quarter' : 7884e6,
        'month'   : 2628e6,
        'week'    : 6048e5,
        'day'     : 864e5,
        'hour'    : 36e5,
        'minute'  : 6e4,
        'second'  : 1e3
      }

    if(false === !!quarter)
    {
      delete unitMap.quarter
    }

    if(false === !!week)
    {
      delete unitMap.week
    }

    for(const unit in unitMap)
    {
      const diffFlooredUnit = Math.floor(Math.abs(diff) / unitMap[unit])

      if(diffFlooredUnit >= 1)
      {
        return relativeTime.format(diffFlooredUnit * (diff > 0 ? 1 : -1), unit)
      }
    }

    return relativeTime.format(0, 'second')
  }

  /**
   * Shift the time zone offset difference between the provided time zones for the date instance.
   * @param {object} [config] Optional configurations.
   * @param {string} [config.timeZoneOrigin] Time zone that the date instance is currently in, defaults to `this.config.timeZoneOrigin`, @example 'UTC' | 'CET'
   * @param {string} [config.timeZoneTarget] Time zone to convert the timestamp to, defaults to `this.config.timeZoneTarget`, @example 'UTC' | 'GMT' | 'CET' | 'America/New_York' | 'Europe/London'
   * @returns {this}
   */
  shiftTimeZone(config)
  {
    const
      origin              = config?.origin ?? config?.timeZoneOrigin ?? this.config.timeZoneOrigin,
      target              = config?.target ?? config?.timeZoneTarget ?? this.config.timeZoneTarget,
      rootTimeZoneDate    = this,
      originTimeZoneDate  = new Date(rootTimeZoneDate.toLocaleString('en', { timeZone: origin })),
      targetTimeZoneDate  = new Date(rootTimeZoneDate.toLocaleString('en', { timeZone: target })),
      timezoneOffsetTime  = originTimeZoneDate.getTime() - targetTimeZoneDate.getTime()

    this.setTime(this.getTime() - timezoneOffsetTime)

    return this
  }

  /**
   * Format this date object to a string representation.
   * @param {string} formatString Format string, @example 'YYYY-MM-DD HH:mm:ss'
   * @param {object} [config] Optional configurations.
   * @param {string} [config.locale] Locale to format the date in, defaults to `this.config.locale`, @example 'en' | 'en-US' | 'es' | 'es-ES'
   * @param {string} [config.timeZone] Time zone to format the date in, defaults to `this.config.timeZoneOrigin`, @example 'UTC'
   * @returns {string} The formatted date string.
   */
  format(formatString, config)
  {
    const 
      locale    = config?.locale    ?? this.config.locale,
      timeZone  = config?.timeZone  ?? this.config.timeZoneOrigin,
      mapper    = match => this.config.format.mapper(match, this, timeZone, locale)

    return formatString.replace(this.config.format.regExp, mapper)
  }
}

export class Config
{
  /**
   * Locale to format the date in.
   * @example 'en' | 'en-US' | 'es' | 'es-ES' | 'fr' | 'fr-FR'
   * @default 'en'
   * @type {string}
   */
  get locale()
  {
    return this._locale ?? 'en'
  }
  set locale(locale)
  {
    this._locale = locale
  }

  /**
   * Locale matcher to use.
   * @example 'lookup' | 'best fit'
   * @default 'best fit'
   * @type {string}
   */
  get localeMatcher()
  {
    return this._localeMatcher ?? 'best fit'
  }
  set localeMatcher(localeMatcher)
  {
    this._localeMatcher = localeMatcher
  }

  /**
   * Style to format the date in.
   * @example 'long' | 'short' | 'narrow'
   * @default 'long'
   * @type {string}
   */
  get style()
  {
    return this._style ?? 'long'
  }
  set style(style)
  {
    this._style = style
  }

  /**
   * If to include numeric in the relative time difference.
   * @example 'auto' | 'always' | 'never'
   * @default 'auto'
   * @type {string}
   */
  get numeric()
  {
    return this._numeric ?? 'auto'
  }
  set numeric(numeric)
  {
    this._numeric = numeric
  }

  /**
   * If to include quarter in the relative time difference.
   * @example true | false
   * @default false
   * @type {boolean}
   */
  get quarter()
  {
    return this._quarter ?? false
  }
  set quarter(quarter)
  {
    this._quarter = quarter
  }

  /**
   * If to include week in the relative time difference.
   * @example true | false
   * @default true
   * @type {boolean}
   */
  get week()
  {
    return this._week ?? true
  }
  set week(week)
  {
    this._week = week
  }

  /**
   * Time zone to convert the timestamp to.
   * @example 'UTC' | 'GMT' | 'CET' | 'America/New_York' | 'Europe/London'
   * @default undefined | locale time zone
   * @type {string}
   */
  get timeZoneOrigin()
  {
    return this._timeZoneOrigin
  }
  set timeZoneOrigin(timeZoneOrigin)
  {
    this._timeZoneOrigin = timeZoneOrigin
  }

  /**
   * Time zone to convert the timestamp to.
   * @example 'UTC' | 'GMT' | 'CET' | 'America/New_York' | 'Europe/London'
   * @default 'UTC'
   * @type {string}
   */
  get timeZoneTarget()
  {
    return this._timeZoneTarget ?? 'UTC'
  }
  set timeZoneTarget(timeZoneTarget)
  {
    this._timeZoneTarget = timeZoneTarget
  }

  /**
   * Date format specific configurations.
   * @type {object}
   * @property {RegExp} regExp Regular expression to match the format string.
   * @property {object} map Map of format string to function, used to map date formats.
   */
  format =
  {
    dateTime  : (locale, date, options) => Intl.DateTimeFormat(locale, options).format(date),
    regExp    : /DATETIME(?:\+\-)?|[D|d]atetime(?:\+\-)?|DATE|[D|d]ate|TIME(?:ZONE)?(?:\+\-)?|[T|t]ime(?:zone)?|YEAR|year|YYYY|yy|MONTH|month|Month1|MM1?|MM|WEEKDAY|weekday|Weekday1|DAY|day|Day1|DD1?|DD|HH1?|H1[1|2]|h1[1|2]|H2[3|4]|h2[3|4]|mm1?|ii1?|sss?1?|ms1?|TZ|tz|\+\-/g,
    mapper(key, date, timeZone, locale)
    {
      switch(key)
      {
        case 'DATETIME+-' : return this.dateTime(locale, date, { timeZone, dateStyle : 'full',   timeStyle : 'long'   })
        case 'DATETIME'   : return this.dateTime(locale, date, { timeZone, dateStyle : 'full',   timeStyle : 'medium' })
        case 'Datetime+-' : return this.dateTime(locale, date, { timeZone, dateStyle : 'medium', timeStyle : 'long'   })
        case 'Datetime'   : return this.dateTime(locale, date, { timeZone, dateStyle : 'medium', timeStyle : 'medium' })
        case 'datetime+-' : return this.dateTime(locale, date, { timeZone, dateStyle : 'short',  timeStyle : 'long'   })
        case 'datetime'   : return this.dateTime(locale, date, { timeZone, dateStyle : 'short',  timeStyle : 'medium' })
        case 'DATE'       : return this.dateTime(locale, date, { timeZone, dateStyle : 'full'    })
        case 'Date'       : return this.dateTime(locale, date, { timeZone, dateStyle : 'medium'  })
        case 'date'       : return this.dateTime(locale, date, { timeZone, dateStyle : 'short'   })
        case 'TIME+-'     : return this.dateTime(locale, date, { timeZone, timeStyle : 'full'    })
        case 'TIME'       : return this.dateTime(locale, date, { timeZone, timeStyle : 'long'    })
        case 'Time'       : return this.dateTime(locale, date, { timeZone, timeStyle : 'medium'  })
        case 'time'       : return this.dateTime(locale, date, { timeZone, timeStyle : 'short'   })
        case 'YEAR'       : return this.dateTime(locale, date, { timeZone, year      : 'numeric' })
        case 'year'       : return this.dateTime(locale, date, { timeZone, year      : '2-digit' })
        case 'YYYY'       : return this.dateTime(locale, date, { timeZone, year      : 'numeric' })
        case 'yy'         : return this.dateTime(locale, date, { timeZone, year      : '2-digit' })
        case 'MONTH'      : return this.dateTime(locale, date, { timeZone, month     : 'long'    })
        case 'month'      : return this.dateTime(locale, date, { timeZone, month     : 'short'   })
        case 'Month1'     : return this.dateTime(locale, date, { timeZone, month     : 'narrow'  })
        case 'MM'         : return this.dateTime(locale, date, { timeZone, month     : '2-digit' })
        case 'MM1'        : return this.dateTime(locale, date, { timeZone, month     : 'numeric' })
        case 'WEEKDAY'    : return this.dateTime(locale, date, { timeZone, weekday   : 'long'    })
        case 'weekday'    : return this.dateTime(locale, date, { timeZone, weekday   : 'short'   })
        case 'Weekday1'   : return this.dateTime(locale, date, { timeZone, weekday   : 'narrow'  })
        case 'DAY'        : return this.dateTime(locale, date, { timeZone, weekday   : 'long'    })
        case 'day'        : return this.dateTime(locale, date, { timeZone, weekday   : 'short'   })
        case 'Day1'       : return this.dateTime(locale, date, { timeZone, weekday   : 'narrow'  })
        case 'DD'         : return this.dateTime(locale, date, { timeZone, day       : '2-digit' })
        case 'DD1'        : return this.dateTime(locale, date, { timeZone, day       : 'numeric' })
        case 'HH'         : return this.dateTime(locale, date, { timeZone, hour      : '2-digit', hourCycle:'h23' })
        case 'HH1'        : return this.dateTime(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h23' })
        case 'H11'        : return this.dateTime(locale, date, { timeZone, hour      : '2-digit', hourCycle:'h11' })
        case 'h11'        : return this.dateTime(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h11' })
        case 'H12'        : return this.dateTime(locale, date, { timeZone, hour      : '2-digit', hourCycle:'h12' })
        case 'h12'        : return this.dateTime(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h12' })
        case 'H23'        : return this.dateTime(locale, date, { timeZone, hour      : '2-digit', hourCycle:'h23' })
        case 'h23'        : return this.dateTime(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h23' })
        case 'H24'        : return this.dateTime(locale, date, { timeZone, hour      : '2-digit', hourCycle:'h24' })
        case 'h24'        : return this.dateTime(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h24' })
        case 'mm1'        : return this.dateTime(locale, date, { timeZone, minute    : 'numeric' })
        case 'mm'         : return this.dateTime(locale, date, { timeZone, minute    : '2-digit' }).padStart(2, '0')
        case 'ii1'        : return this.dateTime(locale, date, { timeZone, minute    : 'numeric' })
        case 'ii'         : return this.dateTime(locale, date, { timeZone, minute    : '2-digit' }).padStart(2, '0')
        case 'ss1'        : return this.dateTime(locale, date, { timeZone, second    : 'numeric' })
        case 'ss'         : return this.dateTime(locale, date, { timeZone, second    : '2-digit' }).padStart(2, '0')
        case 'sss'        : 
        case 'ms'         : return String(date.getUTCMilliseconds()).padStart(3, '0')
        case 'sss1'       : 
        case 'ms1'        : return String(date.getUTCMilliseconds())
        case 'TIMEZONE'   : 
        case 'TIMEZONE+-' : return this.dateTime(locale, date, { timeZone, timeZoneName:'longOffset'    }).split(' ').pop()
        case 'Timezone'   : return this.dateTime(locale, date, { timeZone, timeZoneName:'short'         }).split(' ').pop()
        case 'timezone'   :
        case 'timezone+-' : return this.dateTime(locale, date, { timeZone, timeZoneName:'shortOffset'   }).split(' ').pop()
        case 'TZ'         : return this.dateTime(locale, date, { timeZone, timeZoneName:'longGeneric'   }).split(' ').pop()
        case 'tz'         : return this.dateTime(locale, date, { timeZone, timeZoneName:'shortGeneric'  }).split(' ').pop()
        case '+-'         : return this.dateTime('en',   date, { timeZone, timeZoneName:'longOffset'    }).split('GMT').pop()
        default:
        {
          const error = new Error(`Invalid date-time segment: "${key}"`)
          error.code  = 'E_DATE_INVALID_SEGMENT'
          throw error
        }
      }
    }
  }
}