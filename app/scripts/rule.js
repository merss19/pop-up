import Course from './course';
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const Rule = (($) => {


    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME                = 'rule'
    const DATA_KEY            = 'rule'
    const EVENT_KEY           = `.${DATA_KEY}`
    const JQUERY_NO_CONFLICT  = $.fn[NAME]

    const ClassName = {
        select: 'select-action',
        noAction: 'action-rule__no-action',
        actionList: 'action-list',
        actionDesc: 'action-desc',
        actionDescBox: 'action-desc__box',
        actionDescList: 'action-desc__list',
        addBtn: 'action-desc__add',
        addCancel: 'action-desc__cancel',
        selectAction: 'select-action',
        actionTable: 'action-table',
        course: 'action-table_todo-courseItems',
        actionTableEdit: 'action-table__edit',
        actionTableDelete: 'action-table__delete',
        actionTableList: 'action-table__ul',
        from: 'action-rule__input_type_from',
        upto:'action-rule__input_type_upto'

    }

    const Class = {
        select: `.${ClassName.select}`,
        noAction:`.${ClassName.noAction}`,
        actionList: `.${ClassName.actionList}`,
        actionDesc: `.${ClassName.actionDesc}`,
        actionDescBox: `.${ClassName.actionDescBox}`,
        actionDescList: `.${ClassName.actionDescList}`,
        addBtn: `.${ClassName.addBtn}`,
        addCancel: `.${ClassName.addCancel}`,
        selectAction: `.${ClassName.selectAction}`,
        actionTable: `.${ClassName.actionTable}`,
        course: `.${ClassName.course}`,
        actionTableEdit: `.${ClassName.actionTableEdit}`,
        actionTableDelete: `.${ClassName.actionTableDelete}`,
        actionTableList: `.${ClassName.actionTableList}`,
        from: `.${ClassName.from}`,
        upto: `.${ClassName.upto}`
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    class Rule {

        constructor(rule) {
            console.log('constructor')
            console.log(rule)
            this.ruleObj = $(rule)
            this.select = this.ruleObj.find(Class.select)
            this.noAction = this.ruleObj.find(Class.noAction)
            this.actionList = this.ruleObj.find(Class.actionList)
            //this.actionDesc = this.rule.find(Class.actionDesc)
            this.actionDesc = this.ruleObj.closest('.modal-body').find(Class.actionDesc)
            this.actionDescBox = this.actionDesc.find(Class.actionDescBox)
            this.actionDescList = this.actionDesc.find(Class.actionDescList)
            this.addBtn = this.actionDesc.find(Class.addBtn)
            this.addCancel = this.actionDesc.find(Class.addCancel)
            this.selectAction = this.ruleObj.find(Class.selectAction)
            this.actionTable = this.actionList.find(Class.actionTable)
            this.course = this.actionTable.find(ClassName.course)
            this.edit = this.actionTable.find(ClassName.edit)
            this.delete = this.ruleObj.find(ClassName.delete)
            this.from = this.ruleObj.find(Class.from)
            this.upto = this.ruleObj.find(Class.upto)
            console.log(this.ruleObj)
            this._select()


        }


        // getters


     /*   static get VERSION() {
            return VERSION
        }

        static get Default() {
            return Default
        }
*/

        // public


        hideActionDesc(){
            console.log('hideActionDesc')
            this.actionDesc.hide();
            //this.selectAction.val('select');
            $(document.body).off('click.hideActionDesc');
        }

        render(data){
            console.log('render')
            console.log(this.ruleObj)

            if(data){
                this.dataRender = data
            }
            console.log(this.dataRender)
            console.log(this)
            console.log(this.from)
            //отрисовка баллов
            this.from.val(this.dataRender['answer_final_from_int']);
            this.upto.val(this.dataRender['answer_final_upto_int']);

            //отрисовка программ
           /* self.actionTable.empty();
            self.actionList.show();*/

        }



        // private


        _select() {
            console.log('_select')
            console.log(this.select)

            this.select.on('change', () => {

                this.noAction.hide()

                //определяем выбранный селект
                let $selected = this.ruleObj.find(Class.select + ' option:selected'),

                    actionId = $selected.attr('data-id'),
                    courseId = $selected.attr('data-id_c')

                    console.log($selected)
                    console.log(actionId)
                    console.log(courseId)

                // что выбрано, курс или действие
                if (courseId) {
                    this._addCourse()
                } else if (actionId) {
                    this._addAction()
                }
            });
        }

        _addCourse(){
            console.log('_addCourse')

            let $action = this.ruleObj.find(Class.select + ' option:selected'),

                courseId = $action.attr('data-id_c'),
                courseName = $action.text(),

                action = {
                    id: courseId,
                    name: courseName
                }
            console.log($action)
            this.actionList.show()

            let course = new Course(action,this);
            console.log(course)
            course.edit();

        }

        _addAction(){
            console.log('_addAction')
        }


        // static

        static _init(config) {
            return this.each(function () {
                console.log('_init')

                let $this = $(this),
                    data  = $this.data(DATA_KEY)
                console.log(config)
                if (!data) {
                    $this.data(DATA_KEY, (data = new Rule($this)))
                }
                console.log(data)
                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`)
                    }
                    data[config].call($this)
                }


                console.log(config.method)
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

