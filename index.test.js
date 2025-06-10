import { test, suite }  from 'node:test'
import contextualAssert from '@superhero/audit/assert/contextual'
import Date             from '@superhero/date'

suite('@superhero/date', () =>
{
  test('should calculate past time difference in days', () =>
  {
    const now     = new Date('2024-01-10T12:00:00Z')
    const past    = new Date('2024-01-05T12:00:00Z')
    const output  = now.timeDifference(past)
    const assert  = contextualAssert({ now, past })

    assert.strictEqual(output, '5 days ago')
  })

  test('should calculate future time difference in hours', () =>
  {
    const base    = new Date('2024-01-01T10:00:00Z')
    const future  = new Date('2024-01-01T14:00:00Z')
    const output  = base.timeDifference(future)
    const assert  = contextualAssert({ base, future })

    assert.strictEqual(output, 'in 4 hours')
  })

  test('should throw if invalid date passed to timeDifference', () =>
  {
    const base    = new Date()
    const invalid = 'not-a-date'
    const assert  = contextualAssert({ base, invalid })

    assert.throws(() => base.timeDifference(invalid), {
      code: 'E_DATE_INVALID_ARGUMENT'
    })
  })

  test('should shift time zone and change timestamp', () =>
  {
    const date    = new Date('2024-01-01T12:00:00Z')
    const before  = date.getTime()
    date.shiftTimeZone({ origin: 'UTC', target: 'America/New_York' })
    const after   = date.getTime()
    const assert  = contextualAssert({ date, before, after })

    assert.strictEqual(new Date(before).timeDifference(after), '5 hours ago',
      'Time difference should be 5 hours after shifting from UTC to America/New_York')
  })

  test('should format with default configuration', () =>
  {
    const date    = new Date('2024-06-01T13:45:30Z')
    const output  = date.format('YYYY-MM-DD HH:mm:ss')
    const assert  = contextualAssert({ date, output })

    assert.match(output, /^2024-06-01 \d{2}:\d{2}:\d{2}$/)
  })

  test('should format with given locale and timeZone', () =>
  {
    const date    = new Date('2024-12-25T00:00:00Z')
    const output  = date.format('DATE TIME', 
    {
      locale    : 'fr-FR',
      timeZone  : 'Europe/Paris'
    })
    const assert = contextualAssert({ date, output })

    assert.strictEqual(output, 'mercredi 25 décembre 2024 01:00:00 UTC+1',
      'DATE TIME should format correctly in French locale with Paris time zone')
  })

  test('should pad and display all mapped keys', () =>
  {
    const date = new Date('2024-07-04T14:04:05.006+07:00')
    date.config.timeZoneOrigin = '+07:00'

    const assert = contextualAssert({ date })

    assert.strictEqual(date.format('DATETIME+-'), 'Thursday, July 4, 2024 at 2:04:05 PM GMT+7', 'DATETIME+- should format correctly')
    assert.strictEqual(date.format('DATETIME'),   'Thursday, July 4, 2024 at 2:04:05 PM',       'DATETIME should format correctly')
    assert.strictEqual(date.format('Datetime+-'), 'Jul 4, 2024, 2:04:05 PM GMT+7',              'Datetime+- should format correctly')
    assert.strictEqual(date.format('Datetime'),   'Jul 4, 2024, 2:04:05 PM',                    'Datetime should format correctly')
    assert.strictEqual(date.format('datetime+-'), '7/4/24, 2:04:05 PM GMT+7',                   'datetime+- should format correctly')
    assert.strictEqual(date.format('datetime'),   '7/4/24, 2:04:05 PM',                         'datetime should format correctly')
    assert.strictEqual(date.format('DATE'),       'Thursday, July 4, 2024',                     'DATE should format correctly')
    assert.strictEqual(date.format('Date'),       'Jul 4, 2024',                                'Date should format correctly')
    assert.strictEqual(date.format('date'),       '7/4/24',                                     'date should format correctly')
    assert.strictEqual(date.format('TIME+-'),     '2:04:05 PM GMT+07:00',                       'TIME+- should format correctly')
    assert.strictEqual(date.format('TIME'),       '2:04:05 PM GMT+7',                           'TIME should format correctly')
    assert.strictEqual(date.format('Time'),       '2:04:05 PM',                                 'Time should format correctly')
    assert.strictEqual(date.format('time'),       '2:04 PM',                                    'time should format correctly')

    assert.strictEqual(date.format('TIMEZONE'),   'GMT+07:00',      'TIMEZONE should format correctly')
    assert.strictEqual(date.format('Timezone'),   'GMT+7',          'Timezone should format correctly')
    assert.strictEqual(date.format('timezone'),   'GMT+7',          'timezone should format correctly')
    assert.strictEqual(date.format('TZ'),         'GMT+07:00',      'TZ should format correctly')
    assert.strictEqual(date.format('tz'),         'GMT+7',          'tz should format correctly')

    assert.strictEqual(date.format('YYYY'),       '2024',           'YYYY should format correctly')
    assert.strictEqual(date.format('yy'),         '24',             'yy should format correctly')
    assert.strictEqual(date.format('MONTH'),      'July',           'MONTH should format correctly')
    assert.strictEqual(date.format('month'),      'Jul',            'month should format correctly')
    assert.strictEqual(date.format('Month1'),     'J',              'Month1 should format correctly')
    assert.strictEqual(date.format('MM'),         '07',             'MM should format correctly')
    assert.strictEqual(date.format('MM1'),        '7',              'MM1 should format correctly')
    assert.strictEqual(date.format('WEEKDAY'),    'Thursday',       'WEEKDAY should format correctly')
    assert.strictEqual(date.format('weekday'),    'Thu',            'weekday should format correctly')
    assert.strictEqual(date.format('Weekday1'),   'T',              'Weekday1 should format correctly')
    assert.strictEqual(date.format('DAY'),        'Thursday',       'DAY should format correctly')
    assert.strictEqual(date.format('day'),        'Thu',            'day should format correctly')
    assert.strictEqual(date.format('Day1'),       'T',              'Day1 should format correctly')
    assert.strictEqual(date.format('DD'),         '04',             'DD should format correctly')
    assert.strictEqual(date.format('DD1'),        '4',              'DD1 should format correctly')
    assert.strictEqual(date.format('HH'),         '14',             'HH should format correctly')
    assert.strictEqual(date.format('HH1'),        '14',             'HH1 should format correctly')
    assert.strictEqual(date.format('H11'),        '02 PM',          'H11 should format correctly')
    assert.strictEqual(date.format('h11'),        '2 PM',           'h11 should format correctly')
    assert.strictEqual(date.format('H12'),        '02 PM',          'H12 should format correctly')
    assert.strictEqual(date.format('h12'),        '2 PM',           'h12 should format correctly')
    assert.strictEqual(date.format('H23'),        '14',             'H23 should format correctly')
    assert.strictEqual(date.format('h23'),        '14',             'h23 should format correctly')
    assert.strictEqual(date.format('H24'),        '14',             'H24 should format correctly')
    assert.strictEqual(date.format('h24'),        '14',             'h24 should format correctly')
    assert.strictEqual(date.format('mm1'),        '4',              'mm1 should format correctly')
    assert.strictEqual(date.format('mm'),         '04',             'mm should format correctly')
    assert.strictEqual(date.format('ii1'),        '4',              'ii1 should format correctly')
    assert.strictEqual(date.format('ii'),         '04',             'ii should format correctly')
    assert.strictEqual(date.format('ss1'),        '5',              'ss1 should format correctly')
    assert.strictEqual(date.format('ss'),         '05',             'ss should format correctly')
    assert.strictEqual(date.format('sss'),        '006',            'sss should format correctly')
    assert.strictEqual(date.format('ms'),         '006',            'ms should format correctly')
    assert.strictEqual(date.format('sss1'),       '6',              'sss1 should format correctly')
    assert.strictEqual(date.format('ms1'),        '6',              'ms1 should format correctly')
    assert.strictEqual(date.format('+-'),         '+07:00',         '+- should format correctly')
  })

  test('should handle invalid format gracefully', () =>
  {
    const date = new Date()
    const assert = contextualAssert({ date })
    const output = date.format('INVALID')
    
    assert.strictEqual(output, 'INVALID', 'INVALID format should return the same string')
  })
})
