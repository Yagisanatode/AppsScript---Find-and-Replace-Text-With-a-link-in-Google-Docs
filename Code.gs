/**
 * Find an replace text with a single link where there is no
 * other text in the paragraph.
 */
function singleLink() {
  // ## Inputs ##
  let text = "My URL";
  let url = "https://yagisanatode.com/";
  let textToFind = "{{SINGLE LINK}}";
  // ############

  let body = DocumentApp.getActiveDocument().getBody();

  

  body.findText(textToFind)
      .getElement()         //Gets the current text element.
      .asText()             //Gets the element as a Text item.
      .setText(text)        //Updates the text for that element.
      .setLinkUrl(url);     //Sets the hyperlink for that element.

};

/**
 * Find and replace text with a single link where there is more text
 * in the paragraph. 
 */
function singleLinkWithinParagraph(){
  // ## Inputs ##
  let text = "My URL";
  let url = "https://yagisanatode.com/";
  let textToFind = "{{SINGLE LINK IN PARA}}";
  // ############

  let body = DocumentApp.getActiveDocument().getBody();
  
  let foundText = body.findText(textToFind);

  // Get the start and end location of the text in the paragraph.
  let startText = foundText.getStartOffset();
  let endText = startText + text.length - 1;

  // Get the element indext for this section of text.
  let element = foundText.getElement();

  // Replace the text and insert the URL.
  element.asText()
         .replaceText(textToFind, text)
         .setLinkUrl(startText, endText, url);
};


/**
 * Find text and replace it with a list of links.
 */
function multiLinkSet(){
  // ## Inputs ##
  const links = [
    {
      title: "My website",
      url: "https://yagisanatode.com/"
    },
    {
      title: "Twitter",
      url: "https://twitter.com/LifeOfSpy/"
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/yagisanatode"
    }
  ];

  let textToFind = "{{LINKS}}";
  // ############

  let body = DocumentApp.getActiveDocument().getBody();

  // Gets the paragraph element containing the text.
  let element = body.findText(textToFind)
                    .getElement()
                    .getParent();

  // Gets the index location of the para containing the text. 
  let index = body.getChildIndex(element);

  // Removes the paragraph element from the text.
  element.removeFromParent();

  //Loop through the list of link objects and add to the document.
  links.slice().reverse().forEach(link =>{
  body.insertListItem(index , link.title)
      .setLinkUrl(link.url)
      .setGlyphType(DocumentApp.GlyphType.NUMBER)
  
  });
};
