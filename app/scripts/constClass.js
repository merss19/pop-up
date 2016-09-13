
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


const Class = {
    modal: '.rule-modal',
    modalBody:'.modal-body',
    modalContent:'.modal-content',
    select: '.select-action',
    addRule:'.rule-modal__btn',
    ruleBody:'.rule-modal__body',
    edit:'.rule-table__icon',
    ruleTable:'.rule-table',
    ruleTableItem:'.rule-table__item',
    modalList:'.rule-modal__list',
    noAction: '.add-action__no-action',
    noRule:'.rule-modal__no-rule',
    actionList: '.action-list',
    actionDesc: '.action-desc',
    actionDescBox: '.action-desc__box',
    actionDescList: '.action-desc__list',
    addBtn: '.action-desc__add',
    cancelBtn: '.action-desc__cancel',
    addCancel: '.action-desc__cancel',
    selectAction: '.select-action',
    selectInput:'.add-action__input',
    selectList: '.add-action__list',
    selectOption:'.add-action__option',
    actionTable: '.action-table',
    actionRule: '.action-rule',
    course: '.action-table_todo-courseItems',
    from: '.action-rule__input_type_from',
    upto:'.action-rule__input_type_upto',
    close:'.action-rule__close',
    actionTableEdit: '.action-table__icon_type_edit',
    actionTableDelete: '.action-table__icon_type_delete',
    actionTableList: '.action-table__list',
    actionTableNoCourse: '.action-table__no-course',
    icons:'.action-table__icons',
    icon:'.action-table__icon',
    btnSave:'.rule-modal__save',
    actionRuleCollapse: '.action-rule__collapse',
    ruleTableEdit:'.rule-table__edit',
    ruleTableBtn:'.rule-table__btn',
    actionRuleTrigger:'.action-rule__trigger'

}
const ClassName = {
    ruleTableBtn:'rule-table__btn',
    ruleTableEdit:'rule-table__edit',
    inProcess:'inProcess'
}

const TplName = {
    rule:'rule',
    ruleModal:'rule-modal',
    ruleSelect:'rule-select',
    actionDescList:'action-desc__list',
    course:'course',
    courseItem:'course-item'
}

const Tpl = {
    rule:`#tpl-${TplName.rule}`,
    ruleModal:`#tpl-${TplName.ruleModal}`,
    ruleSelect:`#tpl-${TplName.ruleSelect}`,
    actionDescList:`#tpl-${TplName.actionDescList}`,
    course:`#tpl-${TplName.course}`,
    courseItem:`#tpl-${TplName.courseItem}`
}

const Constant = {
    select:'Добавить развивающее действие'
}

const Data = {
    category:'data-category',
    user:'data-user',
    idR:'data-id_r',
    iprId:'data-ipr_setting_id',
    value:'data-value',
    idC:'data-id_c',
    id:'data-id',
    programId:'data-program_id'
}

const Event = {
    clickSave:'click.save',
    clickAddRule:'click.addRule',
    clickDelete:'click.delete',
    clickHideActionDesc:'click.hideActionDesc',
    actionDescShown:'actionDesc.shown',
    clickSelect:'click.select',
    clickAddSetting:'click.addSetting',
    clickCancelSetting:'click.cancelSetting'
}

const loading = '<img class ="loading" src="/assets/img/loading.gif" />'

export { Class, ClassName, TplName, Tpl, loading, Constant, Data, Event};
