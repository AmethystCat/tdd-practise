var expect = chai.expect;
describe('table component unit', function () {
    it('should_render_a_table_when_input_table_columns_and_data', function () {
        // given
        var config = {
                renderContainer: $('#table'),
                columns: [
                    {title: '姓名', dataIndex: 'name'},
                    {title: '年龄', dataIndex: 'age'}
                ],
                renderData: [
                    {name: 'HC', age: 18}
                ]
            };
        var table = new Table(config);
        // when
        var thead = table.children('thead'),
            trInThead = thead.children('tr'),
            thInTheadTr = trInThead.children('th'),

            tbody = table.children('tbody'),
            trInTbody  = tbody.children('tr'),
            tdInTbodyTr = trInTbody.children('td');

        var hasTable = table.length,
            hasThead = thead.length,
            hasTrInThead = trInThead.length,
            hasThInTheadTr = thInTheadTr.length,
            hasTbody = tbody.length,
            hasTrInTbody = trInTbody.length,
            hasTdInTbodyTr = tdInTbodyTr.length;

        var fristThContent = thInTheadTr.eq(0).text(),
            secondThContent = thInTheadTr.eq(1).text(),
            firstTdContentInTbody = tdInTbodyTr.eq(0).text(),
            secondTdContentInTbody = tdInTbodyTr.eq(1).text();

        // then
        expect(hasTable).to.be.ok;
        expect(hasThead).to.be.ok;
        expect(hasTrInThead).to.be.ok;
        expect(hasThInTheadTr).to.be.ok;
        expect(hasTbody).to.be.ok;
        expect(hasTrInTbody).to.be.ok;
        expect(hasTdInTbodyTr).to.be.ok;

        expect(fristThContent).to.equal(config.columns[0].title);
        expect(secondThContent).to.equal(config.columns[1].title);

        expect(firstTdContentInTbody).to.equal(config.renderData[0].name);
        expect(secondTdContentInTbody).to.equal(config.renderData[1].age);
    });
});