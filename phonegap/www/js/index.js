/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var ipaddress = '10.113.78.193:8080';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function showSpinner(){
    $.mobile.loading("show");
}

function hideSpinner(){
    $.mobile.loading("hide");
}

function validatepassword() {
	var passwordinput = $('#passwordinput').val();
	if (passwordinput == '') {
		alert('Password field is blank');
	}
	else {
		$.ajax({
		type: 'POST',
		url: 'http://' + ipaddress + '/login',
		beforeSend: function() { 
			showSpinner(); 
		},
    complete: function() { 
			hideSpinner(); 
		},
		data: passwordinput,
		
		success: function(data) {
			if (data == 'Success') {
				window.location = 'home.html';
			}
			else {
				alert('Password incorrect!');
			}
		},
		error: function() {
			alert('Something went wrong');
			window.location.reload();
		}
	});
	}
}

function unlock() {
	$.ajax({
		type: 'POST',
		url: 'http://' + ipaddress + '/unlock',
		beforeSend: function() { 
			showSpinner(); 
		},
    complete: function() { 
			hideSpinner(); 
		},
		success: function(data) {
			alert('Unlocked!');
		},
		error: function() {
			alert('Something went wrong');
			window.location = 'index.html';
		}
	});
}

function lock() {
	$.ajax({
		type: 'POST',
		url: 'http://' + ipaddress + '/lock',
		beforeSend: function() { 
			showSpinner(); 
		},
    complete: function() { 
			hideSpinner(); 
		},
		success: function(data) {
			alert('Locked!');
		},
		error: function() {
			alert('Something went wrong');
			window.location = 'index.html';
		}
	});
}

function changepassword() {
	var currentpassword = $('#currentpassword').val();
	var newpassword = $('#newpassword').val();
	var confirmpassword = $('#confirmpassword').val();
	
	if (newpassword != confirmpassword) {
		alert('Password confirmation must match entered new password');
	}
	else {
		$.ajax({
		type: 'POST',
		url: 'http://' + ipaddress + '/changepassword',
		beforeSend: function() { 
			showSpinner(); 
		},
    complete: function() { 
			hideSpinner(); 
		},
		data: {
			'current': currentpassword,
			'changed': newpassword
		},
		success: function(data) {
			if (data == 'Success') {
				alert('Password Changed');
				window.location.reload();
			}
			else {
				alert('Current password did not match');
			}
		},
		error: function() {
			alert('Something went wrong!');
			window.location = 'index.html';
		}
	});
	}
}

function checkstatus() {
	$.ajax({
		type: 'POST',
		url: 'http://' + ipaddress + '/checkstatus',
		beforeSend: function() { 
			showSpinner(); 
		},
    complete: function() { 
			hideSpinner(); 
		},
		success: function (data) {
			alert(data);
		},
		error: function() {
			alert('Something went wrong!');
			window.location = 'index.html';
		}
	})
}