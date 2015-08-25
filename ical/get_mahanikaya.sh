#!/bin/sh
curl --data "calendar=mahanikaya&fromYear=2013&toYear=2017" -o mahanikaya.ical "http://localhost:8000/days.ical"
