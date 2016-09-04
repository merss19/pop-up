import gr from './gear';
import {actions} from './data';
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
            console.log(course)
            console.log(rule)
            this.rule= $(rule)[0]
            this.id = course.id_c
            this.ipr = course.ipr_setting_id
            this.name = course.program
            this.actions = course.actions ? course.actions : []
            this.date_upto = course.date_upto ? course.date_upto : null
            //this.save()
            console.log(this.rule)
            console.log(this.id)
            console.log(this.name)
            console.log(this.actions)

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
            console.log(this.rule)
            console.log(this.id)
            console.log(this.name)
            let programName = []
                programName[this.id] = {
                    id: this.id,
                    id_c: this.id,
                    name: this.name
            }
            if (!this.course) {
                this.course = gr.tpla($(Tpl.course).html(), programName, this.rule.actionTable)
            }
            console.log(programName)

            this.course.find(Class.actionTableEdit).on('click', () => this.edit())
            this.course.find(Class.actionTableDelete).on('click', () => this.delete())

            console.log(this.course.find(Class.actionTableEdit))
            this.actionTableList = this.course.find(Class.actionTableList);

            // удалить из списка добавления развивающихся действий
            //this.selectAction.find('option[value="' + self.id + '"]').hide();

            gr.tpl($(Tpl.courseItem).html(), this.actions, this.actionTableList);

            console.log(this.course)
            console.log(this.actions)
            console.log(this.actionTableList)

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
                programs = [],
                programsArr

            $this.prop('disabled', true)
            console.log(dateCurr)
            console.log(checkedCourses)

            if (checkedCourses.length) {
                for (let i = 0; i < checkedCourses.length; i++) {
                    let programId = $(checkedCourses[i]).attr('data-program_id'),
                        id = $(checkedCourses[i]).attr('data-id'),
                         label = $(checkedCourses[i]).next('label');
                    console.log(id)
                    programs[i] = {
                        id: id,
                        program_id: programId,
                        group_id: this.id,
                        action: label.text()
                    }
                    /*programsArr[i] = {
                        id: id,
                        program_id: programId,
                        group_id: this.id,
                        action: label.text()
                    };*/
                }
            }
            this.actions = programs

            this.render()
            this.rule.hideActionDesc()
            console.log(this.actions)
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

            // загрузить полный список доступных программ
            // данные для аякс запроса
            var jData = {
                id: this.id,
                ipr_setting_id: this.ipr_setting_id
            };

            this.rule.actionDescBox.hide();
            this.rule.actionDesc.show();
            console.log(this.rule.actionDesc)
            //boss.actionDesc.append(indicatorbig);
            this.rule.actionDescList.empty();

            if(!this.actionCourse){
                this.actionCourse = []
                // получение данных с сервера
                gr.go('::get_data_actions', jData, (data) => {
                    //демо данные

                    data = actions
                    console.log(data)

                    for (let i = 0; i < data.length; i++) {

                        this.actionCourse[i] = {
                            id:data[i]['id'],
                            course_id:data[i]['course_id'],
                            program_id: data[i]['id'],
                            course_name:data[i]['action'],
                            checked: data[i]['checked'] ? 'checked' : ''
                        }
                    }

                })
            }
            console.log(this.actionCourse)
            console.log(this.actions)
            if(this.actions.length){
                for (let i = 0; i <  this.actionCourse.length; i++) {
                    this.actionCourse[i]['checked'] = ''
                    console.log(this.actionCourse[i]['program_id'])
                    console.log(this.actions.length)
                    console.log(this.actions)
                    for (let k = 0; k <  this.actions.length; k++) {
                        console.log(k)
                        console.log(this.actions[k]['program_id'])
                        console.log((this.actionCourse[i]['program_id'] == this.actions[k]['program_id']))
                        if (this.actionCourse[i]['program_id'] == this.actions[k]['program_id']){

                            this.actionCourse[i]['checked'] = 'checked'
                        }
                    }

                }
                console.log(this.actionCourse)
            }





            gr.tpl($(Tpl.actionDescList).html(), this.actionCourse, this.rule.actionDescList)

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

