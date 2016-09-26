var BiorailsGrid = {

  cv: null, // a Wijmo CollectionView containing our grid data

  init: function (wijmo, data) {
    var me = BiorailsGrid;
    // create grid, some data
    var grid = new wijmo.grid.FlexGrid('#myFlexGrid'),
        filterEl = document.getElementById('fFilter'),
        filterText = '';

    me.cv = new wijmo.odata.ODataCollectionView("/", "results");
    me.cv.trackChanges = true;
    // populate the grid with data
    grid.itemsSource = me.cv;

    // update grid when filter changes
    filterEl.addEventListener('input', function () {
      filterText = this.value.toLowerCase();
      me.cv.refresh();
    });

    // CollectionView filter
    me.cv.filter = function (item) {
      if (filterText) {
        return item.row_label.toLowerCase().indexOf(filterText) > -1;
      } else {
        return true;
      }
    };

    $(document).on("click", "button[data-behaviour='save_grid_changes']", me.onSaveClicked);
  },

  onSaveClicked : function () {
    var me = BiorailsGrid;
    console.log("BiorailsGrid::onSaveClicked");
    me.cv.commitEdit();
    /*    $.ajax({
      type: "PUT",
      url: "/results",
      data: {items: me.cv.items.toSource()},
      dataType: "json",
      success: function(response) {
        //alert("Edited: " + me.cv.itemsEdited + ", Added: " + me.cv.itemsAdded + ", Removed: " + me.cv.itemsRemoved);
        alert(response);
      }
    });*/
  }
};
