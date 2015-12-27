#!/bin/sh
curl --data "calendar=mahanikaya&fromYear=2014&toYear=2018" -o days.json "http://localhost:8000/days.json"
