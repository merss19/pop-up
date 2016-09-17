import gr from './gear';
import {actions} from './data';
import {Class,ClassName, TplName, Tpl, loading, Constant,  Data, Event} from './constClass';

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
            this.rule= $(rule)[0]
            this.id = course.id_c
            this.ipr = course.ipr_setting_id
            this.name = course.program
            this.actions = course.actions ? course.actions : []
            this.table = this.rule.actionTable
            this.indicator = loading
        }



        // public

        render(){
            let programName = []
                programName[this.id] = {
                    id: this.id,
                    id_c: this.id,
                    name: this.name
            }
            //рендеринг курсов
            if (!this.course) {
                this.course = gr.tpla($(Tpl.course).html(), programName, this.table)
            }


            this.course.find(Class.actionTableEdit).on('click', () => this.edit())
            this.course.find(Class.actionTableDelete).on('click', () => this._delete())


            this.actionTableList = this.course.find(Class.actionTableList);
            this.table.show()



            gr.tpl($(Tpl.courseItem).html(), this.actions, this.actionTableList);




            $(this.rule.selectInput).text(Constant.select)

            // удалить из списка добавления программ
            this._updateSelect(this.id, 'hide')

            this._updateNoAction()
            this._updateNoCourse()

        }

        edit() {
            if (this.rule.actionDesc.hasClass(ClassName.inProcess)) {
                return false;
            }

            this.rule.actionDesc.addClass(ClassName.inProcess);

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

                for (let k = 0; k <  this.actions.length; k++) {

                    if (this.actionCourse[i]['program_id'] == this.actions[k]['program_id']){

                        this.actionCourse[i]['checked'] = 'checked'
                    }
                }

            }

            gr.tpl($(Tpl.actionDescList).html(), this.actionCourse, this.rule.actionDescList)



            this.rule.actionDescList.show();
            this.rule.actionDesc.removeClass(ClassName.inProcess);

            this.rule.addBtn.off(Event.clickAddSetting);
            this.rule.addBtn.on(Event.clickAddSetting, () => this._save())

            this.rule.cancelBtn.off(Event.clickCancelSetting);
            this.rule.cancelBtn.on(Event.clickCancelSetting, () => this._cancel())

        }

        // private

        _updateNoAction() {

            if (this.table.find('.table-row').length == 0) {
                this.rule.noAction.show();
                this.table.hide()
            } else {
                this.rule.noAction.hide();
                this.table.show()
            }
        }

        _updateNoCourse() {
            let checkedCourses = this.rule.actionDescList.find('input:checked')

            this.actionTableNoCourse = this.course.find(Class.actionTableNoCourse);

            if (checkedCourses.length == 0 && this.actions == 0) {
                this.actionTableNoCourse.show();
            } else {
                this.actionTableNoCourse.hide();
            }
        }

        _updateSelect(programId, action){
            let options = this.rule.selectOption,
                optionsLen = options.length

            for (let i = 0; i < optionsLen; i++) {
                let id = $(options[i]).attr(Data.idC)

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



        _delete(){
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
                let id = this.course.attr(Data.idC)

                this._updateSelect(id, 'show')

                this._updateNoAction()
            });
        }


        _save() {
            let $this = $(this),
                checkedCourses = this.rule.actionDescList.find('input:checked'),
                programs = []

                for (let i = 0; i < checkedCourses.length; i++) {
                    let programId = $(checkedCourses[i]).attr(Data.programId),
                        id = $(checkedCourses[i]).attr(Data.id),
                         label = $(checkedCourses[i]).next('label');

                    programs[i] = {
                        id: id,
                        program_id: programId,
                        group_id: this.id,
                        action: label.text()
                    }
                }

            this.actions = programs

            this.render()
            this.rule._hideActionDesc()

        }



        _cancel(){
            this.rule._hideActionDesc()
            $(this.rule.selectInput).removeClass('active').text(Constant.select)
        }
    }

    return Course

})(jQuery)

export default Course

