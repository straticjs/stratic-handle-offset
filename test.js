/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var vows = require('perjury'),
    assert = vows.assert;

var suite = vows.describe('stratic-handle-offset module').addBatch({
	'When we mock out Date#getTimezoneOffset': {
		topic: function() {
			Date.prototype.getTimezoneOffset = function getTimezoneOffset() {
				return 0;
			};

			return Date;
		},
		'it works': function(err) {
			assert.ifError(err);
		},
		'it behaves how we expect': function() {
			assert.equal((new Date()).getTimezoneOffset(), 0);
		},
		'and we require the module': {
			topic: function() {
				return require('./index.js');
			},
			'it works': function(err) {
				assert.ifError(err);
			},
			'and we pass it a time object': {
				topic: function(handleOffset) {
					return handleOffset({
						/*

						  This time is taken from a real-word cause of the timezone
						  (well, offset) bug this module is designed to handle.

						  The post in question was written on 2016-08-26. However,
						  without proper offset support, in any timezone to the east
						  of where it was authored - Pacific Time - it's
						  parsed as having been authored 2016-08-27.

						 */
						epoch: 1472279874,
						utcoffset: 'UTC-7'
					});
				},
				'it works': function(err) {
					assert.ifError(err);
				},
				'it returns a moment object': function(err, obj) {
					assert.isTrue(require('moment').fn.isPrototypeOf(obj));
				},
				'the day is correct': function(err, moment) {
					assert.strictEqual(moment.date(), 26);
				},
				'the month is correct': function(err, moment) {
					// month() returns 0 for January
					assert.strictEqual(moment.month(), 7);
				},
				'the year is correct': function(err, moment) {
					assert.strictEqual(moment.year(), 2016);
				}
			}
		}
	}
}).export(module);
