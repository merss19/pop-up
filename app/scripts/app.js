import $ from 'jquery';
import Collapse from './collapse';
import Modal from './modal';
import Rule from './rule';
import gr from './gear';


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
    var dataRule = [
        {
            categoryId:'category-1',
            rules:[
                {
                    "rule_id":1,
                    "ipr_setting_id": 1,
                    "answer_final_from_int": 3,
                    "answer_final_upto_int":7
                },
                {
                    "rule_id":2,
                    "ipr_setting_id": 2,
                    "answer_final_from_int": 1,
                    "answer_final_upto_int":5
                },
                {
                    "rule_id":3,
                    "ipr_setting_id": 3,
                    "answer_final_from_int": 2,
                    "answer_final_upto_int":6
                }

            ]


        },
        {
            categoryId:'category-2',
            rules:[
                {
                    "rule_id":111,
                    "ipr_setting_id": 11,
                    "answer_final_from_int": 4,
                    "answer_final_upto_int":6
                },
                {
                    "rule_id":222,
                    "ipr_setting_id": 22,
                    "answer_final_from_int": 2,
                    "answer_final_upto_int":7
                },
                {
                    "rule_id":333,
                    "ipr_setting_id": 33,
                    "answer_final_from_int": 4,
                    "answer_final_upto_int":8
                },
                {
                    "rule_id":444,
                    "ipr_setting_id": 44,
                    "answer_final_from_int": 1,
                    "answer_final_upto_int":8
                }
            ]


        }
    ]





const ClassName = {
    modal: 'rule-modal',
    addRule:'rule-modal__btn',
    ruleBody:'rule-modal__body',
    edit:'rule-table__icon',
    ruleTable:'rule-table',
    ruleTableItem:'rule-table__item',
    ruleModalList:'rule-modal__list'
}

const Class = {
    modal: `.${ClassName.modal}`,
    addRule: `.${ClassName.addRule}`,
    ruleBody:`.${ClassName.ruleBody}`,
    edit:`.${ClassName.edit}`,
    ruleTable:`.${ClassName.ruleTable}`,
    ruleTableItem:`.${ClassName.ruleTableItem}`,
    ruleModal:`.${ClassName.ruleModal}`,
    ruleModalList:`.${ClassName.ruleModalList}`
}

const TplName = {
    rule:'rule'
}

const Tpl = {
    rule:`#tpl-${TplName.rule}`
}
let count = 0

    let ruleFactory = {

        add: function () {
            $(Class.modal).on('click', Class.addRule, function () {
                let $modal = $(Class.modal),
                    $modallist = $modal.find(Class.ruleModalList),
                    rule,
                    $ruleObj = {},
                    collapse = 'collapse-' + count


                $ruleObj[count] = {
                    collapse: collapse
                }

                count++

                rule = gr.tpla($(Tpl.rule).html(), $ruleObj, $modallist)
                console.log(rule)
                rule.rule('render');
                //rule.rule('test');


            })
        },

        edit: function () {
            console.log('edit')
            $(Class.ruleTable).on('click', Class.edit, function () {
                console.log('edit2')
                let $this = $(this),
                    item = $this.closest(Class.ruleTableItem),
                    dataCategory = item.attr('data-category'),
                    $modal = $(Class.modal),
                    $modallist = $modal.find(Class.ruleModalList),
                    $ruleObj = {},
                    rule=[],

                //данные для отправки на сервер
                    jData = {
                        categoryId: dataCategory
                    }

                console.log(dataRule)
                $modallist.empty();
                $modal.modal('show');


                gr.go('::get_data', jData, (data) => {

                    //имитация обрaботки запроса и получение данных от сервера
                    for (let category in dataRule) {

                        if (dataRule[category]['categoryId'] === dataCategory) {
                            data = dataRule[category]
                        }

                    }
                    console.log(data)

                    for (let k in data.rules) {
                        let id = 'actionRule-' + data.rules[k]['rule_id'],
                            collapse = 'collapse-' + data.rules[k]['rule_id']

                        $ruleObj[k] = {
                            ipr_setting_id: data.rules[k]['ipr_setting_id'],
                            id_r: data.rules[k]['rule_id'],
                            id_rule: id,
                            collapse: collapse,
                            answer_final_from_int: data.rules[k]['answer_final_from_int'],
                            //answer_final_from_type: data.rules[k]['answer_final_from_type'],
                            answer_final_upto_int: data.rules[k]['answer_final_upto_int']
                            //answer_final_upto_type: data.rules[k]['answer_final_upto_type']
                        }

                       /* rule[k] = gr.tpl($(Tpl.rule).html(), $ruleObj[k], $modallist)
                        console.log(rule)
                        //rule.rule()
                        rule[k].rule({
                            method:'render',
                            data:$ruleObj[k]
                        })*/
                        //rule=''
                        //admin.render(data.settings[k]);
                    }

                    rule = gr.tpl($(Tpl.rule).html(), $ruleObj, $modallist)

                    for (let i=0; i < rule.length; i++) {
                        console.log(rule[i])
                        console.log($ruleObj[i])
                        $(rule[i]).rule({
                            method:'render',
                            data:$ruleObj[i]
                        })
                    }

                    console.log($ruleObj)
                    console.log(rule)
                })
            })

        }
    }


ruleFactory.add()
ruleFactory.edit()



