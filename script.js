$(document).on('click', '.add', function() {
	// clone a new input block
	var thisTask = $(this).closest('.task-block');
    var newTask = thisTask.clone();
    // empty the input field of the new input block
    $(newTask).find('input:text').val('');
    // insert the new input block under the the one whose + button is clicked
    $(newTask).insertAfter(thisTask);
    // manipulate id and names of all input blocks
    $('.task-block').each(function(index, value) {
    	$(this).attr('id', index + 'taskBlock');
    	$(this).find('.input-task').attr('id', index + 'task').attr('name', index + 'task');
    	$(this).find('.input-link').attr('id', index + 'link').attr('name', index + 'link');
    	$(this).find('.input-code').attr('id', index + 'code').attr('name', index + 'code');
    	$(this).find('.input-level').attr('id', index + 'level').attr('name', index + 'level');
	});
});

$(document).on('click', '.delete', function() {
	// first input block can not be deleted; others can be
	if ($(this).closest('.task-block').attr('id') != '0taskBlock') {

		// in case of the senario: 1(level 0), 2(level 1),3(level 2) - remove 2
		// solution: adjust 3's margin and level number
		var thisObj = $(this).closest('.task-block');
		var thisLevel = thisObj.find('input.input-level').val();
		var thisPosition = -1;

		if (thisPosition != $('.task-block').length - 1) {
			// record the position of the deleted block
			thisPosition = parseInt(thisObj.attr('id').substring(0, 1), 10);
			// adjust 3's margin and level number
			var nextObj = $(this).closest('.task-block').next();
			var nextLevel = nextObj.find('input.input-level').val();
			var prevLevel = thisObj.prev().find('input.input-level').val();
			if (thisLevel > prevLevel && thisLevel < nextLevel) {
				autoMoveLeft(nextObj);
			}
		}

		// delete a input block
		$(this).closest('.task-block').remove();
		// manipulate id and names of all input blocks
	    $('.task-block').each(function(index, value) {
	    	$(this).attr('id', index + 'taskBlock');
	    	$(this).find('.input-task').attr('id', index + 'task').attr('name', index + 'task');
	    	$(this).find('.input-link').attr('id', index + 'link').attr('name', index + 'link');
	    	$(this).find('.input-code').attr('id', index + 'code').attr('name', index + 'code');
	    	$(this).find('.input-level').attr('id', index + 'level').attr('name', index + 'level');
		});
	};
});

// automatically move left in case of delete
function autoMoveLeft(x) {
	// margin-left
	x.css('margin-left', function(index, value) {
		return parseInt(value, 10) - 50 + 'px';
	});
	// level-value
	x.find('input.input-level').val(function(index, value) {
		return parseInt(value, 10) - 1;
	});
}

// click to move right
$(document).on('click', '.to-Right', function() {
	// first input block can not move; others can
	if ($(this).closest('.task-block').attr('id') != '0taskBlock') {
		// move right
		if ($(this).parents('.task-block').prev().find('input.input-level').val() >= $(this).parents('.task-block').find('input.input-level').val()) {
			moveRight($(this));
		}
	}
});

// move right
function moveRight(x) {
	// margin-left
	x.closest('.task-block').css('margin-left', function(index, value) {
		return parseInt(value, 10) + 50 + 'px';
	});
	// level-value
	x.parents('.task-block').find('input.input-level').val(function(index, value) {
		return parseInt(value, 10) + 1;
	});
}

// click to move left
$(document).on('click', '.to-Left', function() {
	// first input block can not move; others can
	var totalBlocks = $('.task-block');
	var lastBlockID = $(totalBlocks[totalBlocks.length - 1]).attr('id');
	var currentLevel = $(this).parents('.task-block').find('input.input-level').val();

	if ($(this).closest('.task-block').attr('id') == lastBlockID) {
		if (currentLevel > 0) {
			moveLeft($(this));
		}
	} else {
		if (currentLevel >= $(this).parents('.task-block').next().find('input.input-level').val() && currentLevel > 0) {
			moveLeft($(this));
		}
	}
});

// move left
function moveLeft(x) {
	// margin-left
	x.closest('.task-block').css('margin-left', function(index, value) {
		return parseInt(value, 10) - 50 + 'px';
	});
	// level-value
	x.parents('.task-block').find('input.input-level').val(function(index, value) {
		return parseInt(value, 10) - 1;
	});
}
