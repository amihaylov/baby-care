"use strict"
// on document ready
$( document ).ready(function(){

	// bind add sitter to SzoneApp.addSitter
   $("button#submit-sitter").click(function(){
   	var sitter = {name: $("input#sitter-name").val(),
   				   email: $("input#sitter-email").val(),
             phone: $("input#sitter-phone").val(),
   				   experience: $("#sitter-exp").val(),};

   	SzoneApp.addSitter(sitter);

   });

   // Show quiz area
   $("#quiz-anchor").click(function(){
   		$("#req-sitter").css("display","");
   });

})