import gr from './gear';
import {actions} from './data';
import {Class,ClassName, TplName, Tpl, loading, Constant,  Data, Event} from './constClass';

const Course = (($) => {


    /**
     * Название класса
     * @constant
     * @type {string}
     * @default
     */


    const NAME                = 'course'
    const DATA_KEY            = 'course'
    const EVENT_KEY           = `.${DATA_KEY}`
    const JQUERY_NO_CONFLICT  = $.fn[NAME]



    class Course {

        /**
         * Создание объекта курса
         * @param {array} course - Список курсов
         * @param {object} rule - Правило
         * @private
         */

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

        /**
         * Рендеринг курса
         * @public
         */

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


        /**
         * Редактирование курса
         * @public
         */


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
                    let dataLen = data.length

                    for (let i = 0; i < dataLen; i++) {

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
            let actionCourseLen = this.actionCourse.length

            for (let i = 0; i <  actionCourseLen; i++) {
                this.actionCourse[i]['checked'] = ''

                let actionsLen = this.actions.length

                for (let k = 0; k <  actionsLen; k++) {

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

        /**
         * Показ/скрытие "нет развивающих действий "
         * @private
         */

        _updateNoAction() {

            if (this.table.find('.table-row').length == 0) {
                this.rule.noAction.show();
                this.table.hide()
            } else {
                this.rule.noAction.hide();
                this.table.show()
            }
        }

        /**
         * Показ/скрытие "нет выбранных курсов"
         * @private
         */


        _updateNoCourse() {
            let checkedCourses = this.rule.actionDescList.find('input:checked')

            this.actionTableNoCourse = this.course.find(Class.actionTableNoCourse);

            if (checkedCourses.length == 0 && this.actions == 0) {
                this.actionTableNoCourse.show();
            } else {
                this.actionTableNoCourse.hide();
            }
        }


        /**
         * Показ/скрытие программ в селекте
         * @param {string} programId - id программы
         * @param {string} action - 'hide'/'show'
         * @private
         */

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

        /**
         * Удаление курса
         * @private
         */

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


        /**
         * Сохранение курса
         * @private
         */

        _save() {
            let $this = $(this),
                checkedCourses = this.rule.actionDescList.find('input:checked'),
                programs = [],
                checkedCoursesLen = checkedCourses.length

                for (let i = 0; i < checkedCoursesLen; i++) {
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

        /**
         * Отмена редактирование\сохранения курса
         * @private
         */

        _cancel(){
            this.rule._hideActionDesc()
            $(this.rule.selectInput).removeClass('active').text(Constant.select)
        }
    }

    return Course

})(jQuery)

export default Course

