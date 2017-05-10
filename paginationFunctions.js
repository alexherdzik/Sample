function paginate(table_id, currentPage, numPerPage){
    if (currentPage === undefined || currentPage === 0) currentPage = 1;
    if (numPerPage === undefined) numPerPage = 10;
    
    var $table = $('#'+table_id);
    
    var numRows = $table.find('tbody tr.inplay').length;
    var numPages = Math.ceil(numRows / numPerPage);
    
    //If on last page and delete causes numPages to decrease move currentPage back as well
    if(currentPage > numPages) currentPage = numPages;
    
    showItems($table, currentPage, numPerPage);
    setPages($table, numPages, currentPage, numPerPage);
}

function showItems($table, currentPage, numPerPage){
	$table.find('tbody tr.inplay').hide().slice((currentPage - 1) * numPerPage, currentPage * numPerPage).show();
}

function setPages($table, numPages, currentPage, numPerPage){
	//remove previous
	$table.prev('.pager').remove();
	
	//build current
	var $pager = $('<div class="pager"></div>');
	
    //If numPages != 0, always print first page
    if (numPages > 0){
	    $('<span id="'+$table.attr('id')+'_page_1" class="page-number"></span>').text(1).bind('click', {
            newPage: 1
        }, function(event) {
            currentPage = event.data['newPage'];
            showItems($table, currentPage, numPerPage);
            setPages($table, numPages, currentPage, numPerPage);
        }).appendTo($pager).addClass('clickable');
        
        //If skipping a number print '...'
        if (currentPage - 3 > 1){
	        $('<span>...</span>').appendTo($pager);
        }

		//print middle numbers that are not first or last page
		for (var page = currentPage - 2; page <= currentPage + 2; page++) {
	        if (page > 1 && page < numPages){
	        
		        $('<span id="'+$table.attr('id')+'_page_'+page+'" class="page-number"></span>').text(page).bind('click', {
		            newPage: page
		        }, function(event) {
		            currentPage = event.data['newPage'];
		            showItems($table, currentPage, numPerPage);
		            setPages($table, numPages, currentPage, numPerPage);
		        }).appendTo($pager).addClass('clickable');
	        
	        }
        }
    
        //If numPages != 1 always print last page
    	if (numPages > 1){
	    	
	    	//if skipping a number print '...'
	    	if (numPages - 3 > currentPage){
		    	$('<span>...</span>').appendTo($pager);
	    	}
		    
		    $('<span id="'+$table.attr('id')+'_page_'+numPages+'" class="page-number"></span>').text(numPages).bind('click', {
	            newPage: numPages
	        }, function(event) {
	            currentPage = event.data['newPage'];
	            showItems($table, currentPage, numPerPage);
	            setPages($table, numPages, currentPage, numPerPage);
	        }).appendTo($pager).addClass('clickable');

    	}
    }
        
    $pager.insertBefore($table);
   	$('#'+$table.attr('id')+'_page_'+currentPage).addClass('active');
}