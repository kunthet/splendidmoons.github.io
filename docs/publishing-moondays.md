# Publishing Moondays

To keep loading times reasonable, publish only _5 years_ of moonday data, in a
moving window: 2 past, the current and 2 future years.

Moving the window at around New Year's day:

Start a local server of the Uposatha Tool.

```
cd $GOPATH/src/github.com/splendidmoons/uposatha-tool
go run main.go helpers.go structs.go
```

In this project's folder, update the years limits in `data/get_days.sh` and
`ical/get_mahanikaya.sh`.

Pretty print JSON with [jq](https://stedolan.github.io/jq/) to be able to diff
the old and new data.

For the `days.json`:

```
cd data/
jq . days.json > days.pp.old.json
get_days.sh
jq . days.json > days.pp.new.json
```

Check if the new data looks ok:

```
meld days.pp.old.json days.pp.new.json
```

For `mahanikaya.ical`:

```
cd mahanikaya/
cp mahanikaya.ical mahanikaya.old.ical
get_mahanikaya.sh
```

Confirm that the old year is gone, and the new is added.

Select the overlapping range and copy over the old to the new, to keep the DTSTAMP and UID of that range.

Validate the new file.

```
meld mahanikaya.old.ical mahanikaya.ical
```






