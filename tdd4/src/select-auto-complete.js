function SelectAutoComplete(renderContainer, foods) {

    function generateLi() {
        return foods.map(function(food) {
            return '<li data-id="' + food.id + '"><a href="#">'+ food.name +'</a></li>';
        });
    }

    function getDom() {
        var $selectWrapper = $('<div class="select-wrapper"></div>');
        var li = generateLi().join('');
        var $input = $('<input type="text" class="select-input"/>');
        var $ul = $('<ul class="select-list hide"></ul>');
        $ul.append(li);
        $selectWrapper.append($input);
        $selectWrapper.append($ul);
        return $selectWrapper;
    }

    function domEventAndStateInit() {
        var $input = $('.select-input'),
            $ul = $('.select-list');

        $input
            .on('focus', function() {
                $ul.removeClass('hide');
            })
            .on('blur', function () {
                $ul.addClass('hide');
            });

        $input.val(foods[0].name || '');
    }

    return {
        getFoods: function () {
            return foods;
        },
        render: function () {
            var $selectWrapper = getDom();
            renderContainer.html('').append($selectWrapper);
            domEventAndStateInit();

            return $selectWrapper;
        }
    };
}