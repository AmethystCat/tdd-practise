function SelectAutoComplete(renderContainer, foods) {

    function generateLi() {
        return foods.map(function(food) {
            return '<li><a href="#" data-id="' + food.id + '">'+ food.name +'</a></li>';
        });
    }

    return {
        getFoods: function () {
            return foods;
        },
        render: function () {
            var $selectWrapper = $('<div class="select-wrapper"></div>');
            var li = generateLi().join('');
            $selectWrapper.append('<input type="text" class="select-input"/>');
            $selectWrapper.append('<ul class="select-list"></ul>');
            $selectWrapper.children('ul').append(li);

            renderContainer.html('').append($selectWrapper);

            return $selectWrapper;
        }
    }
}