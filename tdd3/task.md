## task：3公里内起步价11元，含3公告里，起步价之后，每公里1.6元，起步价及单价，以上车时间的价格为准，行车里程数不为整数的情况下，向上取整数。
* 测试用例1：3公里（含3公里）里程内，只收取起步价
* 意图：核心计价策略之一
* 方法名：should_return_staring_price_when_distance_is_less_than_3_kilometer
* 类名，行为名：Taximeter, computedPrice

---------------

* 测试用例2：超过3公里，起步价后，每公里1.6元
* 意图：核心计价策略之一
* 方法名：should_add_unit_price_every_kilometer_when_distance_bigger_than_3_kilometer
* 类名，行为名：Taximeter, computedPrice

---------------

* 测试用例3：行使3.8，按4公里计费12.6元
* 意图：依赖性相对独立
* 方法名：should_return_4_kilometer_when_distance_is_3.8_kilometer
* 类名，行为名：Taximeter, computedPrice
