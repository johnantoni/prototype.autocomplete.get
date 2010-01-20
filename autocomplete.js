// prototype autocompleter hack using get request

Ajax.Autocompleter = Class.create(Autocompleter.Base, {
  initialize: function(element, update, url, options) {
    this.baseInitialize(element, update, options);
    this.options.asynchronous = true;
    this.options.onComplete = this.onComplete.bind(this);
    this.options.defaultParams = this.options.parameters || null;
    this.url = url;
  },

  show: function() {
    try {
        if (Element.getStyle(this.update, 'display') == 'none') this.options.onShow(this.element, this.update);
    }
    catch(e) {
        this.options.onShow(this.element, this.update);
    }

    //if(Element.getStyle(this.update, 'display')=='none') this.options.onShow(this.element, this.update);
    /*if(!this.iefix && 
      (Prototype.Browser.IE) &&
      (Element.getStyle(this.update, 'position')=='absolute')) {
      new Insertion.After(this.update, 
       '<iframe id="' + this.update.id + '_iefix" '+
       'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' +
       'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
      this.iefix = $(this.update.id+'_iefix');
    }
    if(this.iefix) setTimeout(this.fixIEOverlapping.bind(this), 50);*/
  },

  getUpdatedChoices: function() {
    this.startIndicator();
    
    var entry = encodeURIComponent(this.options.paramName) + '=' +
      encodeURIComponent(this.getToken());
 
    this.options.parameters = this.options.callback ?
      this.options.callback(this.element, entry) : entry;
 
    if(this.options.defaultParams)
      this.options.parameters += '&' + this.options.defaultParams;

    this.options.method = 'get';
    
    new Ajax.Request(this.url, this.options);
  },

  onComplete: function(request) {
    var result = request.responseText;
    result = result.substring(14, result.length-3);
    this.updateChoices(result);
    
    if ($(this.element.id).cumulativeOffset().top > 200) {
        $(this.update.id).style.top = ($(this.element.id).cumulativeOffset().top - $(this.update.id).getDimensions().height)+'px';
    }    
  }

});
