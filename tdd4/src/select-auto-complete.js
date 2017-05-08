function SelectAutoComplete(renderContainer, foods) {
    var foods = foods;
    function generateLi(foods) {
        return foods.map(function (food) {
            return '<li data-id="' + food.id + '"><a href="#">' + food.name + '</a></li>';
        });
    }

    function getDom() {
        var $selectWrapper = $('<div class="select-wrapper"></div>');
        var li = generateLi(foods).join('');
        var $input = $('<input type="text" class="select-input"/>');
        var $ul = $('<ul class="select-list hide"></ul>');
        $ul.append(li);
        $selectWrapper.append($input);
        $selectWrapper.append($ul);
        return $selectWrapper;
    }

    function input(queryFood) {
        return foods.filter(function(food) {
            return food.name.indexOf(queryFood) !== -1;
        });
    }

    return {
        domEventAndStateInit: function(cb) {
            var $input = $('.select-input'),
                $ul = $('.select-list'),
                _this = this;

            function hide(el) {
                el.addClass('hide');
            }

            function show(el) {
                el.removeClass('hide');
            }

            $input
                .val(foods[0].name || '')
                .on('focus', function () {
                    show($ul);
                })
                .on('keyup', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log(e.which);
                    var inputValue = $(this).val();
                    _this.refresh(inputValue);
                });

            $ul.on('click', 'li', function () {
                $input.val($(this).children('a').text());
                hide($(this).parent());
            });

            $(document).on('click', function (e) {
                var $target = $(e.target);
                var hasNoSelectWrapperElements = !( $target.parents('.select-wrapper').length ||
                                                    $target.hasClass('.select-wrapper') );
                if (hasNoSelectWrapperElements) {
                    hide($ul);
                }
            });

            cb && cb();
        },
        getFoods: function () {
            return foods;
        },
        render: function (cb) {
            var $selectWrapper = getDom();
            renderContainer.html('').append($selectWrapper);
            this.domEventAndStateInit(cb);
            return $selectWrapper;
        },
        refresh: function(queryFood) {
            var $selectList = $('.select-list');
            var filterFoods = input(queryFood);
            var li = generateLi(filterFoods);
            $selectList.html(li);
            return $selectList.find('li');
        }
    };
}