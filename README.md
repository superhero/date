# Date

An extended `Date` class with support for relative time formatting, time zone shifting, and a powerful token-based formatting system.

## Installation

```bash
npm install @superhero/date
```

## Usage

### Relative Time Difference

```javascript
import Date from '@superhero/date'

const past    = new Date('2024-01-05T12:00:00Z')
const future  = new Date('2024-01-10T12:00:00Z')

future.timeDifference(past) // "5 days ago"
```

### Time Zone Shifting

```javascript
const date  = new Date('2024-01-01T12:00:00Z')
const paris = date.getTime()
date.shiftTimeZone({ origin: 'Europe/Paris', target: 'America/New_York' })
date.timeDifference(paris) // "in 6 hours"
```

### Format Tokens

The formatter supports rich token-based customization.

```javascript
const date = new Date('2024-07-04T14:04:05.006+07:00')
date.config.timeZoneOrigin = '+07:00'

date.format('YYYY-MM-DD HH:ii:ss')  // "2024-07-04 14:04:05"
date.format('DATETIME+-')           // "Thursday, July 4, 2024 at 2:04:05 PM GMT+7"
date.format('TZ')                   // "GMT+07:00"
date.format('mm')                   // "04"
```

## Format Options

### Date/Time Styles

- `DATETIME+-`  : Thursday, July 4, 2024 at 2:04:05 PM GMT+7
- `DATETIME`    : Thursday, July 4, 2024 at 2:04:05 PM
- `Datetime+-`  : Jul 4, 2024, 2:04:05 PM GMT+7
- `Datetime`    : Jul 4, 2024, 2:04:05 PM
- `datetime+-`  : 7/4/24, 2:04:05 PM GMT+7
- `datetime`    : 7/4/24, 2:04:05 PM
- `DATE`        : Thursday, July 4, 2024
- `Date`        : Jul 4, 2024
- `date`        : 7/4/24
- `TIME+-`      : 2:04:05 PM GMT+07:00
- `TIME`        : 2:04:05 PM GMT+7
- `Time`        : 2:04:05 PM
- `time`        : 2:04 PM

### Time Zone

- `TIMEZONE`    : GMT+07:00
- `TIMEZONE+-`  : GMT+07:00
- `Timezone`    : GMT+7
- `timezone`    : GMT+7
- `timezone+-`  : GMT+7
- `TZ`          : GMT+07:00
- `tz`          : GMT+7
- `+-`          : +07:00

### Date Components

- `YYYY`      : 2024
- `yy`        : 24
- `MONTH`     : July
- `month`     : Jul
- `Month1`    : J
- `MM`        : 07
- `MM1`       : 7
- `WEEKDAY`   : Thursday
- `weekday`   : Thu
- `Weekday1`  : T
- `DAY`       : Thursday
- `day`       : Thu
- `Day1`      : T
- `DD`        : 04
- `DD1`       : 4

### Time Components

- `HH`    : 14 (or 02 if AM)
- `HH1`   : 14 (or 2 if AM)
- `H11`   : 02 PM
- `h11`   : 2 PM
- `H12`   : 02 PM
- `h12`   : 2 PM
- `H23`   : 14
- `h23`   : 14
- `H24`   : 14
- `h24`   : 14
- `mm`    : 04
- `mm1`   : 4
- `ii`    : 04
- `ii1`   : 4
- `ss`    : 05
- `ss1`   : 5
- `ms`    : 006
- `sss`   : 006
- `sss1`  : 6
- `ms1`   : 6

## Configuration

```javascript
date.config.locale           = 'en-US'
date.config.numeric          = 'auto'
date.config.timeZoneOrigin   = 'UTC'
date.config.timeZoneTarget   = 'Europe/Paris'
date.config.style            = 'long'
date.config.localeMatcher    = 'best fit'
```

## Error Handling

- `E_DATE_INVALID_ARGUMENT` — When `.timeDifference()` is passed a non-Date.
- `E_DATE_INVALID_SEGMENT` — When `.format()` receives an unknown token.

## Test Suite

Run tests using:

```bash
npm test
```

### Test Coverage

```
────────────────────────────────── ⋅⋆ Suite ⋆⋅ ─────────────────────────────────


@superhero/date
├─ should calculate past time difference in days
│  └─ ✔ passed 102.345399ms
├─ should calculate future time difference in hours
│  └─ ✔ passed 0.562409ms
├─ should throw if invalid date passed to timeDifference
│  └─ ✔ passed 2.396263ms
├─ should shift time zone and change timestamp
│  └─ ✔ passed 9.967997ms
├─ should format with default configuration
│  └─ ✔ passed 5.700188ms
├─ should format with given locale and timeZone
│  └─ ✔ passed 5.322643ms
├─ should pad and display all mapped keys
│  └─ ✔ passed 17.852539ms
├─ should handle invalid format gracefully
│  └─ ✔ passed 0.455545ms
└─ ✔ suite passed 148.142275ms


──────────────────────────────── ⋅⋆ Coverage ⋆⋅ ────────────────────────────────


Files                                            Coverage   Branches   Functions
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
index.js                                              89%        92%         66%
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
index.test.js                                        100%       100%        100%
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Total                                                 92%        93%         76%


───────────────────────────────── ⋅⋆ Summary ⋆⋅ ────────────────────────────────


Suites                                                                         1
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Tests                                                                          8
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Passed                                                                         8
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Failed                                                                         0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Cancelled                                                                      0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Skipped                                                                        0
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Todo                                                                           0
```

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests for improvements or additional features.
