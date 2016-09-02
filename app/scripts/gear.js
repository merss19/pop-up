const gr = (($) => {



    /**
     * --------------------------------------------------------------------------
     * Public  Gr Api
     * --------------------------------------------------------------------------
     */

    let Gr = {

        go: function (url,jData, done) {
            let data
            return  done(data) //имитация post запроса на сервер
       /*   return $.post(url, jData, function (data) {

                if (!data.error) {
                    done(data)
                } else {
                    alert('Error: ' + data.error);
                }
            }, 'json')
                .fail(function (data) {
                    alert("Bad response. Data: " + $.toJSON(data)); //!!!
                });*/
        },

        // переписывает данные в указанном месте
        tpl: function (tpl, data, tgt) {
            tgt.html('');
            return gr.tpla(tpl, data, tgt);
        },
        // добавляет данные в указанном месте
        tpla: function (tpl, data, tgt) {
            var elements = [];
         /*   console.log(tpl);
            console.log(data);
            console.log(tgt);*/
            for (var k in data) {
                var s = tpl;
                console.log(s);
                for (var kk in data[k]) {
                    var id = Math.random();
                    //s = s.replace(/\--id--/g, id);
                    var ex = new RegExp('-' + kk + '-', 'ig');

                    s = s.replace(ex, data[k][kk]);
                }
                elements.push($(s)[0]);
            }
            return $(elements).appendTo(tgt);
        }

    }





    return Gr

})(jQuery)

export default gr

