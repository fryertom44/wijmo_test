// this file needs to be prefixed with an underscore, so that it loads before the controller-specific js
var gridData = {

  // create simple flat data
  getData: function (count) {
    var data = new wijmo.collections.ObservableArray();
    data.beginUpdate();

    $.getJSON( '/results', function( response ) {
      $.each(response, function (key, val) {
        console.log("key: " + key + ", value: " + val.toString());
        data.push({
          id: val.id,
          row_label: val.row_label,
          is_valid: val.is_valid,
          method_id: val.method_id,
          top: val.top,
          batch: val.batch,
          comments: val.comments,
          conc: val.conc,
          date: new Date(val.date),
          created_at: new Date(val.created_at),
          updated_at: new Date(val.updated_at)
        });
      })
    });
    data.endUpdate();

    return data;
  }
};