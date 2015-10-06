"use strict"
	var questions = [
		[ "City of residence", "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "St Zagora", "Pleven", "button" ],
		[ "How many children do you have in your family?", "1", "2", "3", "4", "More than 4", "button" ],
		[ "How old is the youngest one?", " > 1 year old", "1-2 years old", "2-3 years old", "3-4 years old.", "4-5 years old.", "Over 5 years old", "button" ],
		[ "Have you ever used the services of a professional sitter and in what cases?", "No, I have not", "Yes, while I am at work", "Yes, when I go out in the evening", "Yes, when I cannot take my child on a business trip", "Yes, as extra help at home", "button" ],
		[ "For what kind of commitment do you need a sitter?"," Full-time or more than 10 hours a day","Part-time or less than 6 hours","Periodically, in particular cases/days","I need her/him to live at home with us.","button"],
		[ "What kind of responsibilities would you entrust to your sitter?","Food preparation, nutrition of my child", "Hygiene care", "Education/mentoring/preparation for school","Walks","Out-of-the town trips","Play dates","For escort / transport (e.g. to and from school / kindergarten)","button"],
		[ "What are your concerns when you are about to entrust your child to outside care?","Not to be infected with a disease (influenza, measles, etc.).","Not to be harmed, even by accident","Not to be abused (physically or emotionally)", "My child’s needs - not to be ignored in any way","Not to affect badly on the discipline / daily schedule of my child","Another incidents, related to our home or our personal belongings", "button"],
		[ "What is the amount of money you are willing to spend on a professional babysitter regarding the type of engagement and activities that you are interested in?", "Less than 5 leva/hour", "5-10 leva/hour", "10-15 leva/hour", "15-20 leva/hour"," Up to 20-25 leva/hour", "button" ],
		[ "Please, share with us any further comments or concerns that interest you", "text" ]

	];

	var circle = new ProgressBar.Circle('#bar', {
		color: '#21bdd6',
		strokeWidth: 3,
		trailColor: '#ee4f6b',
		trailWidth: 2,
		duration: 1500,
		text: {
			value: '0'
			// Change text color in quiz
			// style: {
			// 	color: '#fff'
			// }
		},
		step: function(state, bar) {
			bar.setText((bar.value() * Number(questions.length+1)).toFixed(0) + "/" + Number(questions.length+1));
		}
	});

	 // init stuff here
	var pos = 0, test, test_status, question;

	var answers = [];

	function renderQuestion(){
		test = $("#test");
		test.empty();

		circle.animate((pos+1)/Number(questions.length+1), function(){
			circle.animate((pos+1)/Number(questions.length+1));
		});

		if(pos >= questions.length){
			circle.animate((pos+1)/Number(questions.length+1), function(){
				circle.animate(1);
			});
			var pageBreak = $("<br>");
			var h2 = $("<h2></h2>").text("Please, share your personal contact with us and we will reach you soon:");
			var names = $("<h4></h4>").text("Name:");
			var inputNames = $("<input>").attr({"type":"text","id":"names","value":""});
			var email = $("<h4></h4>").text("Email:");
			var inputEmail = $("<input>").attr({"type":"email","id":"email","value":""});
			var phone = $("<h4></h4>").text("Phone:");
			var inputPhone = $("<input>").attr({"type":"text","id":"phone","value":""});
			var ifEmptyFields = $("<h4></h4>").text("Please fill out all the fields.").addClass("invisible")
								.attr({"style":"border-style: solid; border-width: 1px; border-color: #ee4f6b; border-radius: 20px;","id":"warning"});
			test.append(h2).append(names).append(inputNames).append(pageBreak).append(email).append(inputEmail)
				.append(pageBreak).append(phone).append(inputPhone).append(pageBreak).append(ifEmptyFields).append(submit);

			//Adding personal info at end of answers[]
			var legalNotice = $("<div></div>").text("Your personal information will only be used for the purposes of our service and will not be provided to third parties! ")
								.addClass("row legal-notice");
			var submit = $("<button></button>").attr({"onclick":"submit()"}).text("Submit")
							.addClass("btn btn-4 btn-4b btn-back");
			test.append(legalNotice).append(submit);

			pos = 0;
			return false;
		}
		question = questions[pos][0];

		var spanPos = $("<span></span>").text(pos+1+".").addClass("quiz-span");
		var h3 = $("<p></p>").text(question).prepend(spanPos).addClass("quiz-question");
		test.append(h3);
		switch (questions[pos][questions[pos].length-1]){
			default:
			case("button"):
				for(var i=1;i<questions[pos].length-1; i+=1){
					var strFunction = "checkAnswer("+i+")";
					var buttonQuiz = $("<button></button>").text(questions[pos][i])
									.attr({"name":"choices","onclick":strFunction});
					buttonQuiz.addClass("btn btn-6 btn-6c btn-quiz");

					//For cities different than Sofia
					if(i>1 && pos===0)
						buttonQuiz.addClass("no-sofia")
							.attr({"title":"At this moment, the service of SitterZone is only provided in Sofia City. We will offer our care also in your town very soon! "})
							.addClass("text-nosofia");

					test.append(buttonQuiz).append($("<br>"));

				}
				if(pos){
						var buttonPrev = $("<button></button>").text("BACK")
										.attr({"name":"choices","onclick":"goBack()"});
						buttonPrev.addClass("btn btn-4 btn-4b btn-back");
				}
				if(pos)
						test.append(buttonPrev).append($("<br>"));
			break;
			case("text"):
				var textArea = $("<textarea></textarea>").attr({"cols":50, "rows": 7, "maxlength": 500, "id": "quiz-text"})
								.addClass("quiz-textarea");
				test.append(textArea).append($("<br>"));
				answers.push()
				var strFunction = "checkAnswer(\"text\")";
				var button = $("<button></button>").addClass("btn btn-4 btn-4a btn-back")
							.attr({"name":"choices","onclick":strFunction}).text("NEXT");
				test.append(button).append($("<br>"));

				//previous button question
				if(pos){
						var buttonPrev = $("<button></button>").text("Back")
										.attr({"name":"choices","onclick":"goBack()"});
						buttonPrev.addClass("btn btn-4 btn-4b btn-back");
				}
				if(pos)
					test.append(buttonPrev).append($("<br>"));

			break;
		}

	}

	function checkAnswer(answer){
				if(typeof answer === "number")
					answers.push(questions[pos][answer]);
				else
					answers.push($("#quiz-text").val());

		pos++;
		renderQuestion();
	}

	function isEmpty () {
		if($("#names").val() ==="" || $("#email").val() ==="" || $("#phone").val() ===""){
			$("#warning").removeClass("invisible");
			return true;
		}
		return false;
	}

	function goBack () {
		answers.splice(answers.length-1,1);
		pos--;
		renderQuestion();
		console.log(answers);
	}

	function submit(){
		if(!isEmpty()){
			answers.push($("#names").val(),$("#email").val(),$("#phone").val());
			SzoneApp.addClient(answers);

			test = $("#test");
			test.empty();
			var h3 = $("<h3></h3>");

			if(answers[0]==="Sofia")
				h3.text("Thank you! We will contact you soon!");
			else
				h3.text("Thank you! At this moment, the service of SitterZone is only provided in Sofia City. We will offer our care also in your town very soon!");
			test.append(h3);
		}
	}

	window.addEventListener("load", renderQuestion, false);
