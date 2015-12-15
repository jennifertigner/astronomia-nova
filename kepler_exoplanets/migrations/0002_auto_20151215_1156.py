# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-15 19:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kepler_exoplanets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planet',
            name='inclination',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='ingress_duration',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='kepler_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='orbital_period',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='planet_radius',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='semimajor_axis',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='surface_temp',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='transit_depth',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='transit_duration',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='planet',
            name='transits_observed',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='declination',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='light_years_dist',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='right_ascension',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='stellar_mass',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='stellar_radius',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='star',
            name='stellar_temp',
            field=models.IntegerField(null=True),
        ),
    ]
