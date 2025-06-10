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

| Token        | Example                                    | Description                                            |
| ------------ | ------------------------------------------ | ------------------------------------------------------ |
| `DATETIME+-` | Thursday, July 4, 2024 at 2:04:05 PM GMT+7 | Full long date and time with numeric time zone offset. |
| `DATETIME`   | Thursday, July 4, 2024 at 2:04:05 PM       | Full long date and time without time zone.             |
| `Datetime+-` | Jul 4, 2024, 2:04:05 PM GMT+7              | Short date with time and numeric time zone.            |
| `Datetime`   | Jul 4, 2024, 2:04:05 PM                    | Short date with time, no time zone.                    |
| `datetime+-` | 7/4/24, 2:04:05 PM GMT+7                   | Numeric date with time and numeric time zone.          |
| `datetime`   | 7/4/24, 2:04:05 PM                         | Compact numeric date and time.                         |
| `DATE`       | Thursday, July 4, 2024                     | Full long date only.                                   |
| `Date`       | Jul 4, 2024                                | Short-form date only.                                  |
| `date`       | 7/4/24                                     | Numeric short date.                                    |
| `TIME+-`     | 2:04:05 PM GMT+07:00                       | Time with full numeric time zone format.               |
| `TIME`       | 2:04:05 PM GMT+7                           | Time with simplified numeric time zone.                |
| `Time`       | 2:04:05 PM                                 | Time with seconds, no time zone.                       |
| `time`       | 2:04 PM                                    | Short time without seconds.                            |
| `TIMEZONE`   | GMT+07:00                                  | Standard uppercase full time zone.                     |
| `TIMEZONE+-` | GMT+07:00                                  | Full numeric time zone with `+-` label.                |
| `Timezone`   | GMT+7                                      | Simplified mixed-case time zone.                       |
| `timezone`   | GMT+7                                      | Lowercase simplified time zone.                        |
| `timezone+-` | GMT+7                                      | Lowercase simplified time zone with `+-` label.        |
| `TZ`         | GMT+07:00                                  | Abbreviated uppercase time zone.                       |
| `tz`         | GMT+7                                      | Abbreviated lowercase time zone.                       |
| `+-`         | +07:00                                     | Pure numeric offset only.                              |
| `YYYY`       | 2024                                       | Four-digit year.                                       |
| `yy`         | 24                                         | Two-digit year.                                        |
| `MONTH`      | July                                       | Full month name.                                       |
| `month`      | Jul                                        | Abbreviated month name.                                |
| `Month1`     | J                                          | First letter of month name.                            |
| `MM`         | 07                                         | Two-digit month number.                                |
| `MM1`        | 7                                          | One-digit month number if applicable.                  |
| `WEEKDAY`    | Thursday                                   | Full weekday name.                                     |
| `weekday`    | Thu                                        | Abbreviated weekday name.                              |
| `Weekday1`   | T                                          | First letter of weekday.                               |
| `DAY`        | Thursday                                   | Alias for full weekday name.                           |
| `day`        | Thu                                        | Alias for abbreviated weekday name.                    |
| `Day1`       | T                                          | Alias for first letter of weekday.                     |
| `DD`         | 04                                         | Two-digit day of month.                                |
| `DD1`        | 4                                          | One-digit day of month if applicable.                  |
| `HH`         | 14                                         | 24-hour clock, two digits.                             |
| `HH1`        | 14                                         | 24-hour clock, one digit if applicable.                |
| `H11`        | 02 PM                                      | 12-hour clock, two digits, with meridiem.              |
| `h11`        | 2 PM                                       | 12-hour clock, one digit, with meridiem.               |
| `H12`        | 02 PM                                      | Alias for `H11`.                                       |
| `h12`        | 2 PM                                       | Alias for `h11`.                                       |
| `H23`        | 14                                         | 24-hour clock without meridiem.                        |
| `h23`        | 14                                         | Alias for `H23`.                                       |
| `H24`        | 14                                         | Alias for `H23`.                                       |
| `h24`        | 14                                         | Alias for `H23`.                                       |
| `mm`         | 04                                         | Two-digit minute.                                      |
| `mm1`        | 4                                          | One-digit minute if applicable.                        |
| `ii`         | 04                                         | Alias for minute (alternative token).                  |
| `ii1`        | 4                                          | One-digit minute (alias).                              |
| `ss`         | 05                                         | Two-digit second.                                      |
| `ss1`        | 5                                          | One-digit second if applicable.                        |
| `ms`         | 006                                        | Milliseconds, padded.                                  |
| `sss`        | 006                                        | Alias for milliseconds.                                |
| `sss1`       | 6                                          | One-digit millisecond.                                 |
| `ms1`        | 6                                          | Alias for `sss1`.                                      |

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
