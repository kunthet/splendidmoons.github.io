#!/bin/sh
curl --data "calendar=mahanikaya&fromYear=2013&toYear=2017" -o days.json "http://localhost:8000/days.json"
