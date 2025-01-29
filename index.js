export default class extends Date
{
  config = new class
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
      regExp : /DATETIME|datetime|DATE|date|TIME|time|YYYY|yy|MONTH|month|MM|DAY|day|DD|HH|H11|H12|H23|H24|mm|ss|ms|TZ|tz|\+\-/g,
      map    : (format) => 
      ({
        'DATETIME' : (date, timeZone, locale) => format(locale, date, { timeZone, dateStyle : 'full',   timeStyle : 'medium' }),
        'datetime' : (date, timeZone, locale) => format(locale, date, { timeZone, dateStyle : 'short',  timeStyle : 'medium' }),
        'DATE'     : (date, timeZone, locale) => format(locale, date, { timeZone, dateStyle : 'full'    }),
        'Date'     : (date, timeZone, locale) => format(locale, date, { timeZone, dateStyle : 'medium'  }),
        'date'     : (date, timeZone, locale) => format(locale, date, { timeZone, dateStyle : 'short'   }),
        'TIME'     : (date, timeZone, locale) => format(locale, date, { timeZone, timeStyle : 'medium'  }),
        'time'     : (date, timeZone, locale) => format(locale, date, { timeZone, timeStyle : 'short'   }),
        'YYYY'     : (date, timeZone, locale) => format(locale, date, { timeZone, year      : 'numeric' }),
        'yy'       : (date, timeZone, locale) => format(locale, date, { timeZone, year      : '2-digit' }),
        'MONTH'    : (date, timeZone, locale) => format(locale, date, { timeZone, month     : 'long'    }).padStart(2, '0'),
        'month'    : (date, timeZone, locale) => format(locale, date, { timeZone, month     : 'short'   }).padStart(2, '0'),
        'MM'       : (date, timeZone, locale) => format(locale, date, { timeZone, month     : 'numeric' }).padStart(2, '0'),
        'DAY'      : (date, timeZone, locale) => format(locale, date, { timeZone, day       : 'long'    }).padStart(2, '0'),
        'day'      : (date, timeZone, locale) => format(locale, date, { timeZone, day       : 'short'   }).padStart(2, '0'),
        'DD'       : (date, timeZone, locale) => format(locale, date, { timeZone, day       : 'numeric' }).padStart(2, '0'),
        'HH'       : (date, timeZone, locale) => format(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h24' }).padStart(2, '0'),
        'H11'      : (date, timeZone, locale) => format(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h11' }).padStart(2, '0'),
        'H12'      : (date, timeZone, locale) => format(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h12' }).padStart(2, '0'),
        'H23'      : (date, timeZone, locale) => format(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h23' }).padStart(2, '0'),
        'H24'      : (date, timeZone, locale) => format(locale, date, { timeZone, hour      : 'numeric', hourCycle:'h24' }).padStart(2, '0'),
        'mm'       : (date, timeZone, locale) => format(locale, date, { timeZone, minute    : 'numeric' }).padStart(2, '0'),
        'ss'       : (date, timeZone, locale) => format(locale, date, { timeZone, second    : 'numeric' }).padStart(2, '0'),
        'ms'       : (date) => String(date.getUTCMilliseconds()).padStart(3, '0'),
        'TZ'       : (date, timeZone, locale) => format(locale, date, { timeZoneName:'long'  }),
        'tz'       : (date, timeZone, locale) => format(locale, date, { timeZoneName:'short' }),
        '+-'       : (date, timeZone) =>
        {
          if(`${timeZone}`.toLowerCase() === 'utc')
          {
            return '+00:00'
          }

          const
            offset    = -date.getTimezoneOffset(),
            sign      = offset >= 0 ? '+' : '-',
            absOffset = Math.abs(offset),
            hours     = String(Math.floor(absOffset / 60)).padStart(2, '0'),
            minutes   = String(absOffset % 60).padStart(2, '0')

          return `${sign}${hours}:${minutes}`
        }
      })((locale, date, options) => Intl.DateTimeFormat(locale, options).format(date))
    }
  }

  /**
   * @param {Date} date Date to calculate the difference from.
   * @returns {string} The relative time difference.
   */
  timeDifference(date)
  {
    const { localeMatcher, style, numeric, quarter, week } = this.config
    const
      relativeTimeFormat  = new Intl.RelativeTimeFormat(this.config.locale, { localeMatcher, style, numeric }),
      difference          = date - this,
      unitMap             =
      {
        'year'    : 31536e6,
        'quarter' : 7884e6,
        'month'   : 2628e6,
        'week'    : 6048e5,
        'day'     : 864e5,
        'hour'    : 36e5,
        'minute'  : 6e4
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
      const flooredUnitDifference = Math.floor(difference / unit[unit])
      if(flooredUnitDifference > 1)
      {
        return relativeTimeFormat.format(flooredUnitDifference, unit)
      }
    }

    return relativeTimeFormat.format(difference / 1e3, 'second')
  }

  /**
   * Shift the time zone offset difference between the provided time zones for the date instance.
   * @param {object} [config] Optional configurations.
   * @param {string} [config.origin] Time zone that the date instance is currently in, defaults to `this.config.timeZoneOrigin`, @example 'UTC' | 'CET'
   * @param {string} [config.timeZoneTarget] Time zone to convert the timestamp to, defaults to `this.config.timeZoneTarget`, @example 'UTC' | 'GMT' | 'CET' | 'America/New_York' | 'Europe/London'
   * @returns {this}
   */
  shiftTimeZone({ origin = this.config.timeZoneOrigin, target = this.config.timeZoneTarget } = {})
  {
    const
      rootTimeZoneDate    = this,
      targetTimeZoneDate  = new Date(rootTimeZoneDate.toLocaleString('en', { timeZone: target })),
      originTimeZoneDate  = new Date(rootTimeZoneDate.toLocaleString('en', { timeZone: origin })),
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
  format(formatString, { locale = this.config.locale, timeZone = this.config.timeZoneOrigin } = {})
  {
    return formatString.replace(this.config.format.regExp, (match) => this.config.format.map[match](this, timeZone, locale))
  }
}
