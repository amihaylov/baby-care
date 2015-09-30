"use strict"
// on document ready
$( document ).ready(function(){

	// bind add sitter to SzoneApp.addSitter
   $("button#submit-sitter").click(function(){
   	var sitter = {name: $("input#sitter-name").val(),
   				   email: $("input#sitter-email").val(),
             phone: $("input#sitter-phone").val(),
   				   experience: $("input#sitter-experience").val(),};

   	SzoneApp.addSitter(sitter);

   });

})