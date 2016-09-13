import gr from './gear';
import {actions} from './data';
import {Class, TplName, Tpl, loading,Constant} from './constClass';
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
            this.table = this.rule.actionTable
            this.indicator = loading
            //this.save()
            console.log(this.rule)


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
                    id_c: this.id,
                    name: this.name
            }
            if (!this.course) {
                this.course = gr.tpla($(Tpl.course).html(), programName, this.table)
            }


            this.course.find(Class.actionTableEdit).on('click', () => this.edit())
            this.course.find(Class.actionTableDelete).on('click', () => this.delete())


            this.actionTableList = this.course.find(Class.actionTableList);
            this.table.show()



            gr.tpl($(Tpl.courseItem).html(), this.actions, this.actionTableList);

            console.log($(Tpl.courseItem).html())
            console.log(this.actionTableList)

            // удалить из списка добавления программ
            console.log(Constant.select)
            $(this.rule.selectInput).text(Constant.select)


            this.updateSelect(this.id, 'hide')
            this.updateNoAction()
            this._updateNoCourse()



        }

        updateNoAction() {

            if (this.table.find('.table-row').length == 0) {
                this.rule.noAction.show();
                this.table.hide()
            } else {
                this.rule.noAction.hide();
                this.table.show()
            }
        }

        _updateNoCourse() {
            console.log('_updateNoCourse')
            let checkedCourses = this.rule.actionDescList.find('input:checked')
            console.log(this.actions)
            this.actionTableNoCourse = this.course.find(Class.actionTableNoCourse);
            if (checkedCourses.length == 0 && this.actions == 0) {

                this.actionTableNoCourse.show();
            } else {
                this.actionTableNoCourse.hide();
            }
        }

        updateSelect(programId, action){
            let options = this.rule.selectOption,
                optionsLen = options.length
            console.log(options)
            console.log( optionsLen)
            for (let i = 0; i < optionsLen; i++) {
                let id = $(options[i]).attr('data-id_c')
                console.log(programId)
                if(id == programId) {
                    switch (action) {
                        case 'hide':
                            $(options[i]).hide()
                            break
                        case 'show':
                            $(options[i]).show()
                            break
                    }
                }
            }
        }



        delete(){
            console.log('delete-course')


            // данные для аякс запроса

               let jData = {
                   id_c: this.id,
                   name: this.name
                };

            this.icons = this.course.find(Class.icons)
            this.icon = this.course.find(Class.icon)

                        this.icon.hide()
                        this.icons.append(this.indicator);

            gr.go('::delete_program', jData, (d) => {
               /* if (d.error) {
                    alert('Не могу удалить одну или несколько програм! Обратитесь к администратору.');
                    this.course.find('img').remove()
                    this.icon.show();
                    return false;
                }*/

                this.course.remove()


                // вернуть в список добавления развивающихся действий
                let id = this.course.attr('data-id_c')

                this.updateSelect(id, 'show')

                this.updateNoAction()
            });
        }


        save() {
            console.log('save')

            let $this = $(this),
                checkedCourses = this.rule.actionDescList.find('input:checked'),
                dateCurr = this.getDate(),
                programs = [],
                programsArr

            $this.prop('disabled', true)



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

            this.actions = programs

            this.render()
            this.rule._hideActionDesc()
            console.log(this.actions)
            console.log(programs)
        }

        edit() {
            console.log('edit-course')

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


            this.rule._showActionDesc();

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







            gr.tpl($(Tpl.actionDescList).html(), this.actionCourse, this.rule.actionDescList)



            this.rule.actionDescList.show();
            this.rule.actionDesc.removeClass('inProcess');

            this.rule.addBtn.prop('disable', false);
            this.rule.addBtn.off('click.addSetting');
            this.rule.addBtn.on('click.addSetting', () => this.save())

            this.rule.cancelBtn.off('click.cancelSetting');
            this.rule.cancelBtn.on('click.cancelSetting', () => this.cancel())

    }

        cancel(e){

            this.rule._hideActionDesc()
            $(this.rule.selectInput).removeClass('active').text(Constant.select)



        }

        // private




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

