import gr from './gear';
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const Course = (($) => {


    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME                = 'course'
    const DATA_KEY            = 'course'
    const EVENT_KEY           = `.${DATA_KEY}`
    const JQUERY_NO_CONFLICT  = $.fn[NAME]

    const ClassName = {
        actionTableEdit: 'action-table__icon_type_edit',
        actionTableDelete: 'action-table__icon_type_delete',
        actionTableList: 'action-table__list'


    }

    const Class = {
        actionTableEdit: `.${ClassName.actionTableEdit}`,
        actionTableDelete: `.${ClassName.actionTableDelete}`,
        actionTableList: `.${ClassName.actionTableList}`
    }

    const TplName = {
        actionDescList:'action-desc__list',
        course:'course',
        courseItem:'course-item'
    }

    const Tpl = {
        actionDescList:`#tpl-${TplName.actionDescList}`,
        course:`#tpl-${TplName.course}`,
        courseItem:`#tpl-${TplName.courseItem}`

    }

    const Default = {}

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    class Course {

        constructor(course, rule) {
            console.log('constructor-course')

            this.rule= $(rule)[0]
            this.id = course.id
            this.name = course.name
            this.programs = course.programs ? course.programs : []
            this.date_upto = course.date_upto ? course.date_upto : null
            //this.save()

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
        getDate(){

            if (!this.date_upto) {
                return null;
            }
            let tmp = this.date_upto.split('.');
            if (tmp.length >= 3) {
                tmp = tmp[2] + "-" + tmp[1] + "-" + tmp[0];
                let dateCurr = new Date(tmp);
            } else {
                let dateCurr = new Date(this.date_upto);
            }
            return dateCurr;

        }

        render(){
            console.log('render')
            let programName = []
                programName[this.id] = {
                    id: this.id,
                    id_a: this.id,
                    name: this.name
            }
            if (!this.course) {
                this.course = gr.tpla($(Tpl.course).html(), programName, this.rule.actionTable)
            }
            console.log(programName)

            this.course.find(Class.actionTableEdit).on('click', () => this.edit())
            this.course.find(Class.actionTableDelete).on('click', () => this.delete())

            console.log(this.course.find(Class.actionTableEdit))
            this.rule.actionTableList = this.rule.actionTable.find(Class.actionTableList);

            // удалить из списка добавления развивающихся действий
            //this.selectAction.find('option[value="' + self.id + '"]').hide();

            gr.tpl($(Tpl.courseItem).html(), this.programs, this.rule.actionTableList);

            console.log(this.programs)
            console.log(this.rule.actionTableList)

        }



        delete(){
            console.log('delete-course')
        }


        save() {
            console.log('save')
            console.log(this)
            let $this = $(this),
                checkedCourses = this.rule.actionDescList.find('input:checked'),
                dateCurr = this.getDate(),
                programs = {}

            $this.prop('disabled', true)
            console.log(dateCurr)
            console.log(checkedCourses)

            if (checkedCourses.length) {
                for (let i = 0; i < checkedCourses.length; i++) {
                    let programId = $(checkedCourses[i]).attr('data-program_id'),
                         label = $(checkedCourses[i]).next('label');

                    programs[programId] = {
                        id: programId,
                        program_id: programId,
                        group_id: this.id,
                        name: label.text(),
                        date_upto: dateCurr == null ? null : dateCurr.getFullYear() + "-" + (dateCurr.getMonth() + 1) + "-" + dateCurr.getDate()
                    };
                }
            }
            this.programs = programs
            this.render()
            this.rule.hideActionDesc()

            console.log(programs)
        }

        edit() {
            console.log('edit-course')
            console.log(this.rule)
            //console.log(this.rule.actionDescList)
            if (this.rule.actionDesc.hasClass('inProcess')) {
                return false;
            }

            this.rule.actionDesc.addClass('inProcess');

            this.rule.actionDescBox.hide();
            this.rule.actionDesc.show();
            console.log(this.rule.actionDesc)
            //boss.actionDesc.append(indicatorbig);
            this.rule.actionDescList.empty();

            let programs =[]
                programs = [
                    {
                        id: 'selectItem-1',
                        program_id: 22,        // id программы
                        program_name: 'Программа1',    // наименование программы
                        ipr_setting_id: 'Категория 1',   // категория, в которой лежит программа
                        category_id: 222,         // правило, в котором находимся
                        checked: 'checked'
                    },

                    {
                        id: 'selectItem-2',
                        program_id: 33,        // id программы
                        program_name: 'Программа2',    // наименование программы
                        ipr_setting_id: 'Категория 2',   // категория, в которой лежит программа
                        category_id: 333,         // правило, в котором находимся
                        checked: ''
                    }
                ]

            gr.tpl($(Tpl.actionDescList).html(), programs, this.rule.actionDescList)

            console.log(this.rule.actionDescList)

            this.rule.actionDescList.show();
            //boss.showActionDesc($html ? $html.offset().top : 0);
            this.rule.actionDesc.removeClass('inProcess');

            this.rule.addBtn.prop('disable', false);
            this.rule.addBtn.off('click.addSetting');
            this.rule.addBtn.on('click.addSetting', () => this.save())
    }



        // private


        _select() {
            console.log('_select')
            console.log(this.select)

        }




        // static

/*        static _init(config) {
            return this.each(function () {
                console.log('_init-course')

                let $this = $(this),
                    data  = $this.data(DATA_KEY),
                    _config = $.extend(
                    {},
                    Default,
                    $this.data(),
                    typeof config === 'object' && config
                )
                console.log(config);

                if (!data) {
                    $this.data(DATA_KEY, (data = new Course($this)))
                }

                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`)
                    }
                    data[config].call($this)
                }


            })

        }*/

    }



    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

/*    $.fn[NAME]             = Course._init
    $.fn[NAME].Constructor = Course
    $.fn[NAME].noConflict  = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Course._init
    }*/

    return Course

})(jQuery)

export default Course

