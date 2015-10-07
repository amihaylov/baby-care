"use strict"
// on document ready
$( document ).ready(function(){

	// bind add sitter to SzoneApp.addSitter
   $("button#submit-sitter").click(function(){
      if($("#sitter-name").val() ==="" || $("#sitter-email").val() ==="" || $("#sitter-phone").val() ==="" 
         || $("#sitter-exp").val() ===""){
         $("#sitter-warning").removeClass("invisible");
         return true;
      }
      else{
      	var sitter = {name: $("input#sitter-name").val(),
      				   email: $("input#sitter-email").val(),
                phone: $("input#sitter-phone").val(),
      				   experience: $("#sitter-exp").val(),};

      	SzoneApp.addSitter(sitter);
         $("#sitter-warning").addClass("invisible");
         $(this).css("display","none");
      }

   });

   //When closing Join us, hide warning
   $("button#close-sitter").click(function(){
      if(! $("#sitter-warning").hasClass("invisible"))
         $("#sitter-warning").addClass("invisible");
   });
   // Show quiz area
   $("#quiz-anchor").click(function(){
   		$("#req-sitter").css("display","");
   });

})