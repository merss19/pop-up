import Course from './course';
import gr from './gear';
import {Class, TplName, Tpl, loading, Constant, Data, Event} from './constClass';


const Rule = (($) => {


    /**
     * Название класса
     * @constant
     * @type {string}
     * @default
     */
    const NAME                = 'rule'
    const DATA_KEY            = 'rule'
    const EVENT_KEY           = `.${DATA_KEY}`
    const JQUERY_NO_CONFLICT  = $.fn[NAME]


    class Rule {

        /**
         * Создание объекта правила
         * @param {string} rule - Правило
         * @private
         */

        constructor(rule) {
            this.ruleObj = $(rule)
            this.modalBody = this.ruleObj.closest(Class.modalBody)
            this.modalContent = this.ruleObj.closest(Class.modalContent)
            this.modalList = this.ruleObj.closest(Class.modalList)
            this.noRule = this.modalBody.find(Class.noRule)
            this.select = this.ruleObj.find(Class.select)
            this.noAction = this.ruleObj.find(Class.noAction)
            this.actionList = this.ruleObj.find(Class.actionList)
            this.close = this.ruleObj.find(Class.close)
            this.actionDesc = this.ruleObj.closest(Class.modalBody).find(Class.actionDesc)
            this.actionDescBox = this.actionDesc.find(Class.actionDescBox)
            this.actionDescList = this.actionDesc.find(Class.actionDescList)
            this.addBtn = this.actionDesc.find(Class.addBtn)
            this.cancelBtn = this.actionDesc.find(Class.cancelBtn)
            this.addCancel = this.actionDesc.find(Class.addCancel)
            this.selectAction = this.ruleObj.find(Class.selectAction)
            this.selectInput = this.ruleObj.find(Class.selectInput)
            this.selectList = this.ruleObj.find(Class.selectList)
            this.selectOption = this.ruleObj.find(Class.selectOption)
            this.actionTable = this.actionList.find(Class.actionTable)
            this.actionRuleCollapse = this.ruleObj.find(Class.actionRuleCollapse)
            this.actionRuleTrigger = this.ruleObj.find(Class.actionRuleTrigger)
            this.id_r= this.ruleObj.attr(Data.idR)
            this.iprId= this.ruleObj.attr(Data.iprId)
            this.from = this.ruleObj.find(Class.from)
            this.upto = this.ruleObj.find(Class.upto)

            this.close.on(Event.clickDelete, () => this._delete())
            this._select()

            this.actionDesc.on(Event.actionDescShown,  (e) => {

                //закрыть поповер при клике мимо него
                setTimeout(() => {
                    $(document.body).on(Event.clickHideActionDesc, (e)=> {

                        if (!$(e.target).closest(Class.actionDesc).length) {

                            this._hideActionDesc()
                            $(this.selectInput).removeClass('active').text(Constant.select)

                        }

                    })
                },1)

            })

            this.actionRuleCollapse.on('show.bs.collapse', (e) => {
                this.actionRuleTrigger.addClass('active')

                this.modalList.find('.collapse.in').collapse('hide')
            })


            this.actionRuleCollapse.on('hide.bs.collapse', (e) => {

                this.actionRuleTrigger.removeClass('active')

            })
        }


        // public

        /**
         * Рендеринг правила
         * @param {object} data - Данные для рендеринга
         * @public
         */


        render(data){

            if(data){
                this.dataRender = data
                this.from.val(this.dataRender['answer_final_from_int'])
                this.upto.val(this.dataRender['answer_final_upto_int'])
            }

            //рендеринг баллов


            //рендеринг программ
            this.actionTable.empty()
            this.actionList.show()

            let programs = data.programs


            for (let p in programs) {
                 let course = new Course(programs[p],this)
                    //рендеринг курсов
                 course.render()
            }

        }



        // private

        /**
         * Закрытие поповера
         * @private
         */

        _hideActionDesc(){

            this.actionDesc.hide();
            $(document.body).off(Event.clickHideActionDesc);
        }

        /**
         * Открытие поповера
         * @private
         */

        _showActionDesc(){

            this.actionDesc.show();
            this.actionDesc.trigger($.Event(Event.actionDescShown))

        }

        /**
         * Удаление правила
         * @private
         */

        _delete(){

            // данные для аякс запроса
            let jData = {
                ipr_setting_id: this.iprId,
                id_r: this.id_r,

            };

            // Ajax запрос на удаление правила из бд
            gr.go('::ipr_delete_rule', jData,  (d) => {
                this.close.html(loading);
                /*if (d.error) {
                    // Ошибка во входных параметрах.
                 this.close.html('Удалить правило');
                    alert('Не могу удалить правило! Обратитесь к администратору.');
                } else {
                    this.ruleObj.remove();
                    //self.updateNoActionMsg();
                }*/
                this.ruleObj.remove();
                this._updateNoRule()
            });
        }


        /**
         * Показ/скрытие "нет правил"
         * @private
         */

        _updateNoRule() {
            if (this.modalList.find(Class.actionRule).length == 0){
                this.noRule.show();
            } else {
                this.noRule.hide();
            }
        }

        /**
         * Выбор селекта
         * @private
         */

        _select() {
            let input = this.selectInput,
                list = this.selectList,
                self = this

            $(document.body).off(Event.clickSelect)

            input.on('click', () => {

                list.toggle()
                input.toggleClass('active')

                $(document.body).on(Event.clickSelect, (e)=> {

                    if (!$(e.target).closest(Class.select).length) {
                        list.hide()
                        input.removeClass('active')
                    }

                })


                this.selectOption.on('click', function() {

                    let value = $(this).attr(Data.value),
                        id = $(this).attr(Data.idC)

                    input.text(value)
                    list.hide()

                    input.toggleClass('active')

                    input.attr(Data.idC, id)
                    self._addCourse()

                })


            })
        }

        /**
         * Добавление курса
         * @private
         */


        _addCourse(){
            let
                ipr = this.ruleObj.attr(Data.iprId),

                courseId = this.selectInput.attr(Data.idC),
                courseName = this.selectInput.text()

                this.action = {
                    id_c: courseId,
                    program: courseName,
                    ipr_setting_id:ipr
                }

            this.actionList.show()

            let course = new Course(this.action,this);

            course.edit();

        }

        // static
        /**
         * Инициализация объекта класса
         * @param {object} config - данные для инициализации
         * @static
         */
        static _init(config) {
            return this.each(function () {


                let $this = $(this),
                    data  = $this.data(DATA_KEY)

                if (!data) {
                    $this.data(DATA_KEY, (data = new Rule($this)))
                }

                if (typeof config === 'object') {
                    if (data[config.method] === undefined) {
                        throw new Error(`No method named "${config.method}"`)
                    }
                    data[config.method](config.data)
                }
            })
        }

    }



    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME]             = Rule._init
    $.fn[NAME].Constructor = Rule
    $.fn[NAME].noConflict  = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Rule._init
    }

    return Rule

})(jQuery)

export default Rule

