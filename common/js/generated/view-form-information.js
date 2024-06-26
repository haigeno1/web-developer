var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Displays a form
WebDeveloper.Generated.displayForm = function(form, container, documentCount, formsCounter, formTemplate, formElementsTemplate, locale)
{
  var childElement   = document.createElement("th");
  var element        = document.createElement("h4");
  var separator      = document.createElement("hr");
  var table          = document.createElement("table");
  var tableContainer = document.createElement("thead");
  var tableWrapper   = document.createElement("div");

  element.appendChild(document.createTextNode(locale.form));
  element.setAttribute("id", "form-" + formsCounter);
  container.appendChild(element);

  element = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.id));
  element.appendChild(childElement);

  childElement = document.createElement("th");

  childElement.appendChild(document.createTextNode(locale.name));
  element.appendChild(childElement);

  childElement = document.createElement("th");

  childElement.appendChild(document.createTextNode(locale.method));
  element.appendChild(childElement);

  childElement = document.createElement("th");

  childElement.appendChild(document.createTextNode(locale.action));
  element.appendChild(childElement);
  tableContainer.appendChild(element);
  table.appendChild(tableContainer);

  tableContainer = document.createElement("tbody");

  tableContainer.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(formTemplate, form) + "</table>", { ALLOWED_TAGS: ["tr", "td"] }));
  table.appendChild(tableContainer);
  table.setAttribute("class", "table table-borderless table-striped");
  tableWrapper.appendChild(table);
  tableWrapper.setAttribute("class", "table-responsive");
  container.appendChild(tableWrapper);

  // If there are form elements
  if(form.elements.length > 0)
  {
    element        = document.createElement("h4");
    table          = document.createElement("table");
    tableContainer = document.createElement("thead");
    tableWrapper   = document.createElement("div");

    element.appendChild(document.createTextNode(locale.elements));
    container.appendChild(element);

    childElement = document.createElement("th");
    element      = document.createElement("tr");

    childElement.appendChild(document.createTextNode(locale.id));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.name));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.type));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.value));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.label));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.size));
    element.appendChild(childElement);

    childElement = document.createElement("th");

    childElement.appendChild(document.createTextNode(locale.maximumLength));
    element.appendChild(childElement);
    tableContainer.appendChild(element);
    table.appendChild(tableContainer);

    tableContainer = document.createElement("tbody");

    tableContainer.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(formElementsTemplate, form) + "</table>", { ALLOWED_TAGS: ["tr", "td"] }));
    table.appendChild(tableContainer);
    table.setAttribute("class", "table table-borderless table-striped");
    tableWrapper.appendChild(table);
    tableWrapper.setAttribute("class", "table-responsive");
    container.appendChild(tableWrapper);
  }

  separator.setAttribute("class", "m-5");
  container.appendChild(separator);

  WebDeveloper.Generated.addItem(WebDeveloper.Generated.formatFormDescription(form), formsCounter, documentCount + 1);
};

// Formats the form description
WebDeveloper.Generated.formatFormDescription = function(form)
{
  // If the form id is set
  if(form.id)
  {
    return form.id;
  }
  else if(form.name)
  {
    return form.name;
  }

  return form.action;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var container            = null;
  var contentDocument      = null;
  var documents            = data.documents;
  var formDescription      = null;
  var formElementsTemplate = document.getElementById("form-elements").innerHTML;
  var forms                = null;
  var formsCounter         = 1;
  var formsDescription     = locale.forms;
  var formsLength          = null;
  var formTemplate         = document.getElementById("form").innerHTML;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(formsDescription, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  Mustache.parse(formElementsTemplate);
  Mustache.parse(formTemplate);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    formDescription = formsDescription.toLowerCase();
    forms           = contentDocument.forms;
    formsLength     = forms.length;

    // If there is only one form
    if(formsLength == 1)
    {
      formDescription = locale.form.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, formDescription, formsLength, true);

    // If there are forms
    if(formsLength > 0)
    {
      container = WebDeveloper.Generated.generateDocumentContainer();

      // Loop through the forms
      for(var j = 0; j < formsLength; j++)
      {
        WebDeveloper.Generated.displayForm(forms[j], container, i, formsCounter, formTemplate, formElementsTemplate, locale);

        formsCounter++;
      }

      document.getElementById("content").appendChild(container);
    }
    else
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  WebDeveloper.Generated.initializeCommonElements();
};
