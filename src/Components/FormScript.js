import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

function FormScript({ text }) {
  if (text === undefined) {
    text = "";
  }
  return (
    <CopyBlock
      text={`function validatePassword() {
	var form = FormApp.getActiveForm();
	var password = "password"
	var aadharNumber = form.addTextItem().setRequired(true)
	aadharNumber.setTitle("Aadhar Number")
	let aadharNumberValidation = FormApp.createTextValidation()
		.setHelpText('You must enter the valid aadhar Number')
		.requireTextMatchesPattern("^([0-9]{12})$")
		.build();
	aadharNumber.setValidation(aadharNumberValidation);
	var item = form.addTextItem().setRequired(true);
	item.setTitle('Token');
	var textValidation = FormApp.createTextValidation()
		.setHelpText('You must enter the right Token')
		.requireTextMatchesPattern("${text}")
		.build();
	item.setValidation(textValidation);
}`}
      language={"javascript"}
      showLineNumbers={true}
      startingLineNumber={1}
      theme={dracula}
      wrapLines
      customStyle={{
        height: "500px",
        overflow: "scroll",
      }}
    />
  );
}

export default FormScript;
