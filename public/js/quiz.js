"use strict"
	var questions = [
		[ "Градът, в който живеете:", "София", "Пловдив", "Бургас", "Варна", "Стара Загора", "Русе", "button" ],
		[ "Колко деца има във Вашето семейство?", "1", "2", "3", "4", "Повече от 4", "button" ],
		[ "На каква възраст е най-малкото сред тях?", "Под 1 год.", "1-2год", "2-3год.", "3-4год.", "4-5год.", "Над 5 год.", "button" ],
		[ "Използвали ли сте досега услугите на професионален детегледач и по какъв повод?", "Не", "Да, защото имам нужда от грижа за детето си, докато съм на работа", "Да, когато вечер излизам", "Да, когато пътувам и нямам възможност да бъда с детето си", "Да, когато съм вкъщи с детето си, но имам нужда от допълнителна помощ", "button" ],
		[ "От какъв тип ангажираност на детегледача имате нужда?","На пълен работен ден/ до 10-12 часа на ден","На половин работен ден – до 4-6 часа на ден","Периодично – само при конкретна необходимост","Предпочитам да съжителства с нас","button"],
		[ "Какъв вид дейности бихте поверили на професионален детегледач?","Приготвяне на храна за детето + хранене", "Грижа за хигиената", "Обучение/подготовка за училище", "Разходки навън ","Пътуване извън града","Игри с други деца навън или вкъщи","Придружаване/превоз (например, водене и вземане от училище/детска градина)","button"],
		[ "Какви са опасенията Ви, когато поверявате детето си на чужди грижи?","Да не бъде заразено с болест (грип, шарка и др.)","Да не бъде наранено дори и по случайност","Да не бъде малтретирано (физически или емоционално)", "Да не бъдат игнорирани нуждите му","Да не повлияе отрицателно на дисциплината/режима му","Други инциденти, свързани с дома ни или личните ни вещи", "button"],
		[ "Каква е сумата, която сте готови да отделите за професионален детегледач според вида ангажираност и дейностите, които включва услугата?", "под 5 лв./час", "5-10 лв./ час", "10-15 лв./ час", "15-20 лв./час","до 20-25 лв./час", "button" ],
		[ "Моля, споделете с нас допълнителни коментари или опасения относно грижите на детегледача!", "text" ]

	];

	var circle = new ProgressBar.Circle('#bar', {
		color: '#21bdd6',
		strokeWidth: 3,
		trailWidth: 1,
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
	var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;

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
			var h2 = $("<h2></h2>").text("Моля, въведете личните си данни, за да се свържем с Вас:");
			var names = $("<h3></h3>").text("Име:");
			var inputNames = $("<input>").attr({"type":"text","id":"names","value":"First and Last name"});
			var email = $("<h3></h3>").text("Email:");
			var inputEmail = $("<input>").attr({"type":"email","id":"email","value":"Valid email"});
			var phone = $("<h3></h3>").text("Телефон:");
			var inputPhone = $("<input>").attr({"type":"text","id":"phone","value":"Phone number"});
			test.append(h2).append(names).append(inputNames).append(pageBreak).append(email).append(inputEmail)
				.append(pageBreak).append(phone).append(inputPhone).append(pageBreak).append(submit);

			//Adding personal info at end of answers[]
			var legalNotice = $("<div></div>").text("Личните Ви данни ще бъдат използвани само за целите на услугата ни и няма да бъдат предоставени на трети лица! ")
								.addClass("row legal-notice");
			var submit = $("<button></button>").attr({"onclick":"submit()"}).text("Submit")
							.addClass("btn btn-4 btn-4a btn-quiz btn-next");
			test.append(legalNotice).append(submit);

			pos = 0;
			correct = 0;
			return false;
		}
		question = questions[pos][0];

		var spanPos = $("<span></span>").text(pos+1+".").addClass("quiz-span");
		var h3 = $("<h3></h3>").text(question).prepend(spanPos);
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
							.attr({"title":"За момента услугата на SitterZone се предлага само в София-град. Скоро ще предоставам нашата грижа и във Вашето населено място! "})
							.addClass("text-nosofia");
					
					test.append(buttonQuiz).append($("<br>"));
					//TODO Add previous button question and logic
				}
			break;
			case("text"):
				var textArea = $("<textarea></textarea>").attr({"rows": 4,"cols": 50, "maxlength": 500, "id": "quiz-text"})
								.addClass("quiz-textarea");
				test.append(textArea).append($("<br>"));
				answers.push()
				var strFunction = "checkAnswer(\"text\")";
				var button = $("<button></button>").addClass("btn btn-4 btn-4a btn-quiz btn-next")
							.attr({"name":"choices","onclick":strFunction}).text("НАПРЕД");
				test.append(button).append($("<br>"));
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

	function submit(){
		answers.push($("#names").val(),$("#email").val(),$("#phone").val());
		SzoneApp.addClient(answers);

		test = $("#test");
		test.empty();
		var h3 = $("<h3></h3>");

		if(answers[0]==="София")
			h3.text("Екипът на SitterZone Ви благодари! Скоро ще се свържем с Вас!");
		else
			h3.text("Екипът на SitterZone Ви благодари! За момента услугата на SitterZone се предлага само в София-град. Скоро ще предоставам нашата грижа и във Вашето населено място! ");
		test.append(h3);
	}

	window.addEventListener("load", renderQuestion, false);
