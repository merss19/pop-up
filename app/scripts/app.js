import $ from 'jquery';
import Collapse from './collapse';
import {dataRule, actions,selectPrograms} from './data';
import Modal from './modal';
import Rule from './rule';
import gr from './gear';


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const ClassName = {
    modal: 'rule-modal',
    select: 'select-action',
    addRule:'rule-modal__btn',
    ruleBody:'rule-modal__body',
    edit:'rule-table__icon',
    ruleTable:'rule-table',
    ruleTableItem:'rule-table__item',
    ruleModalList:'rule-modal__list'

}

const Class = {
    modal: `.${ClassName.modal}`,
    select: `.${ClassName.select}`,
    addRule: `.${ClassName.addRule}`,
    ruleBody:`.${ClassName.ruleBody}`,
    edit:`.${ClassName.edit}`,
    ruleTable:`.${ClassName.ruleTable}`,
    ruleTableItem:`.${ClassName.ruleTableItem}`,
    ruleModalList:`.${ClassName.ruleModalList}`
}

const TplName = {
    rule:'rule',
    ruleModal:'rule-modal',
    ruleSelect:'rule-select'
}

const Tpl = {
    rule:`#tpl-${TplName.rule}`,
    ruleModal:`#tpl-${TplName.ruleModal}`,
    ruleSelect:`#tpl-${TplName.ruleSelect}`
}
let count = 0 //счетчик созданных правил

    let ruleFactory = {

        init:function () {
            ruleFactory.modal()
        },

        modal:function () {
            $(Class.ruleTable).on('click', '.btn-modal', function (e) {
                console.log('init')

                let $this = $(this),
                    $modal = $(Class.modal),
                    $modallist = $modal.find(Class.ruleModalList),
                    $category = $(this).closest('.rule-table__item').attr('data-category'),
                    $userId = $(this).closest('.rule-table').attr('data-user'),
                    addBtn,
                    data = {},
                    $ruleModal = {}

                $modallist.empty();

                data = {
                    category:$category,
                    userId:$userId
                }

                console.log(data)

                addBtn = $modal.find(Class.addRule)




                addBtn.off('click.addRule');
                addBtn.on('click.addRule',  () => {
                    ruleFactory.add(addBtn, data)
                })

                if($(this).hasClass('rule-table__edit')){
                    ruleFactory.edit($this,data)
                }


            })

        },

        add: function (btn, data) {
            console.log('add2')

                let $modal = btn.closest(Class.modal),
                    $modallist = $modal.find(Class.ruleModalList),
                    $category = data.category,
                    $userId = data.userId,
                    ipr,
                    rule,
                    jData,
                    $ruleObj = {},
                    $ruleModal = {},
                    $ruleSelect = {},
                    collapse = 'collapse-' + count



                //данные для отправки на сервер
                jData = {
                    categoryId: $category,
                    userId:$userId
                }

                // получение данных с сервера
                gr.go('::get_data_program', jData, (data) => {
                    //демо данные

                    data = {
                        selectPrograms:selectPrograms,
                        id_r:count,
                        ipr_setting_id:"ipr_" +count
                    }

                    for (let i=0; i < data.selectPrograms.length; i++) {
                        console.log(data.selectPrograms[i])
                        $ruleSelect[i] = {
                             id: data.selectPrograms[i]['id'],
                            program:data.selectPrograms[i]['program']
                         }
                    }

                    $ruleObj[count] = {
                        collapse: collapse,
                        id_r:data['id_r'],
                        ipr_setting_id:data['ipr_setting_id']

                    }

                })

                console.log($ruleObj)





                count++

                rule = gr.tpla($(Tpl.rule).html(), $ruleObj, $modallist)


                gr.tpla($(Tpl.ruleSelect).html(), $ruleSelect, $(Class.select))


                rule.rule();




        },

        edit: function (btn, data) {
            console.log('edit')


                console.log('edit2')
                let $modal = $(Class.modal),
                    $category = data.category,
                    $userId = data.userId,
                    $modallist = $modal.find(Class.ruleModalList),
                    $ruleObj = {},
                    $ruleSelect={},
                    rule=[],

                //данные для отправки на сервер
                    jData = {
                        categoryId: $category,
                        userId:$userId
                    }

                console.log(dataRule)
                $modallist.empty();

            // получение данных с сервера
                gr.go('::get_data_rule', jData, (data) => {

                    //имитация обрaботки запроса и получение данных от сервера
                    for (let category in dataRule) {

                        if (dataRule[category]['categoryId'] === $category) {
                            data = dataRule[category]
                        }

                    }
                    console.log(data)

                    for (let k in data.rules) {
                        let id = 'actionRule-' + data.rules[k]['rule_id'],
                            collapse = 'collapse-' + data.rules[k]['id_r']

                        $ruleObj[k] = {
                            ipr_setting_id: data.rules[k]['ipr_setting_id'],
                            id_r: data.rules[k]['id_r'],
                            id_rule: id,
                            collapse: collapse,
                            answer_final_from_int: data.rules[k]['answer_final_from_int'],
                            //answer_final_from_type: data.rules[k]['answer_final_from_type'],
                            answer_final_upto_int: data.rules[k]['answer_final_upto_int'],
                            programs:data.rules[k]['programs']
                            //answer_final_upto_type: data.rules[k]['answer_final_upto_type']
                        }

                        for (let i=0; i < data.rules[k].selectPrograms.length; i++) {
                            console.log(data.rules[k].selectPrograms[i])
                            $ruleSelect[i] = {
                                id: data.rules[k].selectPrograms[i]['id'],
                                program:data.rules[k].selectPrograms[i]['program']
                            }
                        }

                    }

                    rule = gr.tpl($(Tpl.rule).html(), $ruleObj, $modallist)
                        gr.tpla($(Tpl.ruleSelect).html(), $ruleSelect, $(Class.select))


                    for (let i=0; i < rule.length; i++) {
                        $(rule[i]).rule({
                            method:'render',
                            data:$ruleObj[i]
                        })
                    }
                    console.log($ruleSelect)
                    console.log($ruleObj)
                    console.log(rule)
                })


        }
    }

ruleFactory.init()




