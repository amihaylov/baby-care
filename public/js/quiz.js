"use strict"
	var circle = new ProgressBar.Circle('#bar', {
		color: '#21bdd6',
		strokeWidth: 3,
		trailWidth: 1,
		duration: 1500,
		text: {
			value: '0'
		},
		step: function(state, bar) {
			bar.setText("Question " + (bar.value() * 5).toFixed(0) + "/5");
		}
	});

	 // init stuff here
	var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
	var questions = [
		[ "What is 10 + 4?", "12", "14", "16", "2" ],
		[ "What is 20 - 9?", "7", "13", "11", "3" ],
		[ "What is 7 x 3?", "21", "24", "25", "1" ],
		[ "What is 8 / 2?", "10", "2", "4", "3" ]
	];
	var answers = [];
	// No longer needed as we now use jQuery
	// function _(x){
	// 	return document.getElementById(x);
	// }
	function renderQuestion(){
		test = $("#test");
		test.empty();

		circle.animate((pos+1)/5, function(){
			circle.animate((pos+1)/5);
		});

		if(pos >= questions.length){
			circle.animate(0.8, function(){
				circle.animate(1);
			});
			// Showing correct answers
			// test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
			// _("test_status").innerHTML = "Test Completed";
			var pageBreak = $("<br>");
			var h2 = $("<h2></h2>").text("Please submit your contact details and click submit:");
			var names = $("<h3></h3>").text("Your first and last names:");
			var inputNames = $("<input>").attr({"type":"text","id":"names","value":"First and Last name"});
			var email = $("<h3></h3>").text("Email:");
			var inputEmail = $("<input>").attr({"type":"text","id":"email","value":"Valid email"});
			var phone = $("<h3></h3>").text("Phone:");
			var inputPhone = $("<input>").attr({"type":"text","id":"phone","value":"Phone number"});
			test.append(h2).append(names).append(inputNames).append(pageBreak).append(email).append(inputEmail)
				.append(pageBreak).append(phone).append(inputPhone).append(pageBreak).append(submit);

			//Adding personal info at end of answers[]
			answers.push(inputNames.val(),inputEmail.val(),inputPhone.val());
			var submit = $("<button></button>").attr({"onclick":"SzoneApp.addClient(answers)"});
			test.append(submit);

			pos = 0;
			correct = 0;
			console.log(answers);
			//SzoneApp.addClient(answers);
			return false;
		}
		question = questions[pos][0];
		chA = questions[pos][1];
		chB = questions[pos][2];
		chC = questions[pos][3];

		var h3 = $("<h3></h3>").text(question);
		var buttonA = $("<button></button>").text(chA).attr({"name":"choices","onclick":"checkAnswer(1)"});	
		var buttonB = $("<button></button>").text(chB).attr({"name":"choices","onclick":"checkAnswer(2)"});
		var buttonC = $("<button></button>").text(chC).attr({"name":"choices","onclick":"checkAnswer(3)"});
		test.append(h3).append(buttonA).append($("<br>")).append(buttonB).append($("<br>")).append(buttonC);
		
		//test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
	}
	function checkAnswer(answer){
		// choices = document.getElementsByName("choices");
		// for(var i=0; i<choices.length; i++){
		// 	if(choices[i].checked){
		// 		choice = choices[i].value;
				switch(answer){
					default:
						console.log("Error in choices!")
					case(1):
						answers.push(questions[pos][1]);
						break;
					case(2):
						answers.push(questions[pos][2]);
						break;
					case(3):
						answers.push(questions[pos][3]);
						break;
				}
				//console.log(answers);
		// 	}
		// }
		// Counting correct answers
		// if(choice == questions[pos][4]){
		// 	correct++;
		// }
		pos++;
		renderQuestion();
	}
	window.addEventListener("load", renderQuestion, false);
