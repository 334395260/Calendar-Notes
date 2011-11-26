$(document).ready(function(){ 
  
  $('#q').click(function(){
    $('#q').attr("value",'');
  });
  
  
  System.Gadget.onUndock = checkState;
  System.Gadget.onDock = checkState;
  //dockedState();
});

function checkState()
{
  if(!System.Gadget.docked) 
  {
    undockedState();
  } 
  else if (System.Gadget.docked)
  {
    dockedState(); 
  }
}

function log( message ) {
  $( "<div/>" ).text( message ).hide().prependTo( "#log" ).fadeIn('slow');
  $("#log div").css({'background':'#555','margin':'1px 4px 1px 2px', 'padding':'5px 0px','color':'#E5E5E5'});
  $( "#log" ).attr( "scrollTop", 0 );
}
    
function dockedState(){
  $('body').css({width:127, height:170, background:'url(../../images/bookbg.png)'});
  $('#phonebook').css({margin: 0, left: 0, padding: 0, position: 'absolute'});
  $('input').css({width:107,margin: '0px 3px 0px 5px'});
  $( "#log" ).css({width:125, margin:'0px 5px 1px 3px'}); 
  $("#heading").css({margin:'0px 5px 1px 3px'});
  autocomplete();
}

function undockedState(){
  $('body').css({width:290, height:220, background:'url(../../images/bookbg_undocked.png)', margin: 0, left: 0, padding: 0});
  $('#phonebook').css({margin: 0, left: 10, padding: 10, position: 'absolute'});
  $('input').css({width:230});
  $( "#log" ).css({width:248, margin:'0px 5px 1px 9px'}); 
  $("#heading").css({margin:'10px 5px 1px 3px'});
  
  autocomplete();

}

function autocomplete(){
  $( "#q" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://www.gbin1.com/technology/jquery/devgadgetforwindowsbyjquery/data.jsp",
          dataType: "jsonp",
          data: {
            name: request.term
          },
          success: function( data ) {
            //response([{id: data.id, label: data.label, value: data.value}]);
            response(
              $.map( data.info, function( item ) {
              return {
                label: item.id,
                value: item.value
              }
            }));
            
          }
        });
      },
      focus: function( event, ui ) {
        $( "#project" ).val( ui.item.label );
        return false;
      },
      minLength: 2,
      select: function( event, ui ) {
        log( ui.item ?
          ui.item.label + " ext. " + ui.item.value:
          "Nothing found");
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
  })
  .data( "autocomplete" )._renderItem = function( ul, item ) {
      return $( "<li></li>" )
        .data( "item.autocomplete", item )
        .append( "<a>" + item.label + "&nbsp;ext.&nbsp;" + item.value + "</a>" )
        .appendTo( ul );
  };
}
