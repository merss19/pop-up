
import {Class,ClassName, TplName, Tpl, loading,Constant, Data, Event} from './constClass';
import gr from './gear';
import {dataRule, actions,selectPrograms} from './data';

let count = 10

const RuleFactory = (($) => {


   class RuleFactory {

        constructor () {
            this.$modal = $(Class.modal),
            this.btnSave = this.$modal.find(Class.btnSave),
            this.addBtn = this.$modal.find(Class.addRule),
            this.modallist = this.$modal.find(Class.modalList)

            $(Class.ruleTable).on('click', '.btn-modal', (e) => {
                this.category = $(e.target).closest('.rule-table__item').attr(Data.category),
                this.userId = $(e.target).closest('.rule-table').attr(Data.user)
                this._modal(e.target)
            })
        }

       // private

        _modal(btn) {
            // открытие модального окна
            let
                $this = $(btn),
                data = {}


            this.modallist.empty()

            data = {
                category: this.category,
                userId: this.userId
            }


            this._add(this.addBtn, data)

            this.addBtn.off(Event.clickAddRule);
            this.addBtn.on(Event.clickAddRule, () => {
                    this._add(this.addBtn, data)
                })

            if ($this.hasClass(ClassName.ruleTableEdit)) {
                this._edit()
            }

            this.btnSave.on(Event.clickSave, () => this._save($this))

        }

        _save(btn) {
            //сохранение правил

            if(this.modallist.children().length != 0){

                if(btn.hasClass(ClassName.ruleTableBtn)){

                    btn.addClass('hide')
                    btn.siblings(Class.ruleTableEdit).removeClass('hide')
                }
            } else {

                if(btn.hasClass(ClassName.ruleTableEdit)){

                    btn.addClass('hide')
                    btn.siblings(Class.ruleTableBtn).removeClass('hide')
                }
            }
            this.btnSave.off(Event.clickSave)

        }

        _add(btn, data) {
            //добавление нового правила

            let
                rule,
                jData,
                $ruleObj = {},
                $ruleModal = {},
                $ruleSelect = {},
                collapse = 'collapse-' + count


            //данные для отправки на сервер
            jData = {
                categoryId: this.category,
                userId: this.userId
            }

            // получение данных с сервера
            gr.go('::get_data_program', jData, (data) => {

                //демо данные
                data = {
                    selectPrograms: selectPrograms,
                    id_r: count,
                    ipr_setting_id: "ipr_" + count
                }

                for (let i = 0; i < data.selectPrograms.length; i++) {

                    $ruleSelect[i] = {
                        id: data.selectPrograms[i]['id'],
                        program: data.selectPrograms[i]['program'],
                        value: data.selectPrograms[i]['program']
                    }
                }

                $ruleObj[count] = {
                    collapse: collapse,
                    id_r: data['id_r'],
                    ipr_setting_id: data['ipr_setting_id']

                }

            })


            count++

            this.$modal.find(Class.noRule).hide();

            //рендеринг правила
            rule = gr.tpla($(Tpl.rule).html(), $ruleObj, this.modallist)

            //рендеринг селекта
            gr.tpla($(Tpl.ruleSelect).html(), $ruleSelect, rule.find(Class.selectList))


            rule.rule();

        }

        _edit() {
            // редактирование уже существующих правил
            let
                $ruleObj = {},
                $ruleSelect = {},
                rule = [],

            //данные для отправки на сервер
                jData = {
                    categoryId: this.category,
                    userId: this.userId
                }


            this.modallist.empty();

            // получение данных с сервера
            gr.go('::get_data_rule', jData, (data) => {

                //демо данные - обработка запроса и получение данных от сервера
                for (let category in dataRule) {

                    if (dataRule[category]['categoryId'] === this.category) {
                        data = dataRule[category]
                    }

                }

                for (let k in data.rules) {
                    let id = 'actionRule-' + data.rules[k]['rule_id'],
                        collapse = 'collapse-' + data.rules[k]['id_r']

                    $ruleObj[k] = {
                        ipr_setting_id: data.rules[k]['ipr_setting_id'],
                        id_r: data.rules[k]['id_r'],
                        id_rule: id,
                        collapse: collapse,
                        answer_final_from_int: data.rules[k]['answer_final_from_int'],
                        answer_final_upto_int: data.rules[k]['answer_final_upto_int'],
                        programs: data.rules[k]['programs']
                    }

                    for (let i = 0; i < data.rules[k].selectPrograms.length; i++) {
                        $ruleSelect[i] = {
                            id: data.rules[k].selectPrograms[i]['id'],
                            program: data.rules[k].selectPrograms[i]['program'],
                            value: data.rules[k].selectPrograms[i]['program']
                        }
                    }

                }
                // рендеринг правил существующих
                rule = gr.tpl($(Tpl.rule).html(), $ruleObj, this.modallist)
                gr.tpla($(Tpl.ruleSelect).html(), $ruleSelect, $(Class.selectList))


                for (let i = 0; i < rule.length; i++) {
                    $(rule[i]).rule({
                        method: 'render',
                        data: $ruleObj[i]
                    })
                }

            })


        }
    }

    return RuleFactory

})(jQuery)

export default RuleFactory