export let dataRule = [
    {
        categoryId:'category-1',
        rules:[
            {
                "id_r":1,
                "ipr_setting_id": 1,
                "answer_final_from_int": 3,
                "answer_final_upto_int":7,
                "programs":[
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[
                            {   "id":7,
                                "program_id":7,
                                "course_id":"action-7",
                                "action":"Уменьшение расходов-4"
                            }
                        ]

                    }
                ],
                "selectPrograms" : [
                {
                    "id":"pr-1",
                    "program":"Персонал"

                },

                {
                    "id":"pr-2",
                    "program":"Мясопереработка"
                },

                {
                    "id":"pr-3",
                    "program":"Товары и услуги"
                },
                {
                    "id":"pr-4",
                    "program":"Упущенная прибыль"
                },

                {
                    "id":"pr-5",
                    "program":"Дельта(помесячно)"
                },

                {
                    "id":"pr-6",
                    "program":"Клиенты"
                },
                {
                    "id": "pr-7",
                    "program": "Маркетинг"
                }

            ]

    },
            {
                "id_r":2,
                "ipr_setting_id": 2,
                "answer_final_from_int": 1,
                "answer_final_upto_int":5,
                "programs":[
                    {   "id_c":"course-1",
                        "program":"Мясопереработка",
                        "actions":[

                            {   "id":7,
                                "course_id":"action-7",
                                "program_id":7,
                                "action":"Уменьшение расходов-4"
                            },
                            {   "id":9,
                                "program_id":9,
                                "course_id":"action-9",
                                "action":"Фильтрация поставщиков-5"
                            },
                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            }
                        ]
                    },
                    {   "id_c":"course-23",
                        "program":"Маркетинг",
                        "actions":[
                            {   "id":7,
                                "program_id":7,
                                "course_id":"action-7",
                                "action":"Уменьшение расходов-4"
                            },
                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    },
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[
                            {   "id":7,
                                "program_id":7,
                                "course_id":"action-7",
                                "action":"Уменьшение расходов-4"
                            },
                            {   "id":8,
                                "program_id":8,
                                "course_id":"action-8",
                                "action":"Анализ данных-5"
                            },
                            {   "id":9,
                                "program_id":9,
                                "course_id":"action-9",
                                "action":"Фильтрация поставщиков-5"
                            },
                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            }
                        ]
                    }
                ],
                "selectPrograms" : [
                    {
                        "id":"pr-1",
                        "program":"Персонал"

                    },

                    {
                        "id":"pr-2",
                        "program":"Мясопереработка"
                    },

                    {
                        "id":"pr-3",
                        "program":"Товары и услуги"
                    },
                    {
                        "id":"pr-4",
                        "program":"Упущенная прибыль"
                    },

                    {
                        "id":"pr-5",
                        "program":"Дельта(помесячно)"
                    },

                    {
                        "id":"pr-6",
                        "program":"Клиенты"
                    },
                    {
                        "id": "pr-7",
                        "program": "Маркетинг"
                    }

                ]

            },
            {
                "id_r":3,
                "ipr_setting_id": 3,
                "answer_final_from_int": 2,
                "answer_final_upto_int":6,
                "programs":[
                    {   "id_c":"course-1",
                        "program":"Мясопереработка",
                        "actions":[

                            {   "id":7,
                                "program_id":7,
                                "course_id":"action-7",
                                "action":"Уменьшение расходов-4"
                            },
                            {   "id":8,
                                "program_id":8,
                                "course_id":"action-8",
                                "action":"Анализ данных-5"
                            },
                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    },
                    {   "id_c":"course-2",
                        "program":"Товары и услуги",
                        "actions":[
                            {   "id":7,
                                "program_id":7,
                                "course_id":"action-7",
                                "action":"Уменьшение расходов-4"
                            },
                            {   "id":12,
                                "program_id":12,
                                "course_id":"action-11",
                                "action":"Анализ данных-6"
                            },
                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    },
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[

                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            },
                            {   "id":12,
                                "program_id":12,
                                "course_id":"action-11",
                                "action":"Анализ данных-6"
                            },
                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    }
                ],
                "selectPrograms" : [
                    {
                        "id":"pr-1",
                        "program":"Персонал"

                    },

                    {
                        "id":"pr-2",
                        "program":"Мясопереработка"
                    },

                    {
                        "id":"pr-3",
                        "program":"Товары и услуги"
                    },
                    {
                        "id":"pr-4",
                        "program":"Упущенная прибыль"
                    },

                    {
                        "id":"pr-5",
                        "program":"Дельта(помесячно)"
                    },

                    {
                        "id":"pr-6",
                        "program":"Клиенты"
                    },
                    {
                        "id": "pr-7",
                        "program": "Маркетинг"
                    }

                ]

            }

        ]


    },
    {
        categoryId:'category-2',
        rules:[
            {
                "id_r":111,
                "ipr_setting_id": 11,
                "answer_final_from_int": 4,
                "answer_final_upto_int":6,
                "programs":[
                    {   "id_c":"course-1",
                        "program":"Мясопереработка",
                        "actions":[
                            {   "id":1,
                                "program_id":1,
                                "course_id":"action-1",
                                "action":"Уменьшение расходов"
                            },
                            {   "id":5,
                                "program_id":5,
                                "course_id":"action-5",
                                "action":"Анализ данных-2"
                            },
                            {   "id":6,
                                "program_id":6,
                                "course_id":"action-6",
                                "action":"Фильтрация поставщиков-3"
                            }
                        ]
                    },
                    {   "id_c":"course-2",
                        "program":"Товары и услуги",
                        "actions":[
                            {   "id":1,
                                "program_id":1,
                                "course_id":"action-1",
                                "action":"Уменьшение расходов"
                            },
                            {   "id":2,
                                "program_id":2,
                                "course_id":"action-2",
                                "action":"Анализ данных"
                            },
                            {   "id":3,
                                "program_id":3,
                                "course_id":"action-3",
                                "action":"Фильтрация поставщиков"
                            },
                            {   "id":6,
                                "program_id":6,
                                "course_id":"action-6",
                                "action":"Фильтрация поставщиков-3"
                            }
                        ]
                    },
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[

                            {   "id":5,
                                "program_id":5,
                                "course_id":"action-5",
                                "action":"Анализ данных-2"
                            }

                        ]
                    },
                    {   "id_c":"course-23",
                        "program":"Маркетинг",
                        "actions":[
                            {   "id":1,
                                "program_id":1,
                                "course_id":"action-1",
                                "action":"Уменьшение расходов"
                            },
                            {   "id":2,
                                "program_id":2,
                                "course_id":"action-2",
                                "action":"Анализ данных"
                            },
                            {   "id":3,
                                "program_id":3,
                                "course_id":"action-3",
                                "action":"Фильтрация поставщиков"
                            }


                        ]

                    }
                ],
                "selectPrograms" : [
                    {
                        "id":"pr-1",
                        "program":"Персонал"

                    },

                    {
                        "id":"pr-2",
                        "program":"Мясопереработка"
                    },

                    {
                        "id":"pr-3",
                        "program":"Товары и услуги"
                    },
                    {
                        "id":"pr-4",
                        "program":"Упущенная прибыль"
                    },

                    {
                        "id":"pr-5",
                        "program":"Дельта(помесячно)"
                    },

                    {
                        "id":"pr-6",
                        "program":"Клиенты"
                    },
                    {
                        "id": "pr-7",
                        "program": "Маркетинг"
                    }

                ]

            },
            {
                "id_r":222,
                "ipr_setting_id": 22,
                "answer_final_from_int": 2,
                "answer_final_upto_int":7,
                "programs":[
                    {   "id_c":"course-13",
                        "program":"Упущенная прибыль",
                        "actions":[

                            {   "id":1,
                                "program_id":1,
                                "course_id":"action-1",
                                "action":"Уменьшение расходов"
                            },
                            {   "id":2,
                                "program_id":2,
                                "course_id":"action-2",
                                "action":"Анализ данных"
                            },

                            {   "id":6,
                                "program_id":6,
                                "course_id":"action-6",
                                "action":"Фильтрация поставщиков-3"
                            }
                        ]
                    },
                    {   "id_c":"course-23",
                        "program":"Маркетинг",
                        "actions":[
                            {   "id":44,
                                "program_id":44,
                                "course_id":"action-4",
                                "action":"Уменьшение расходов-2"
                            },
                            {   "id":5,
                                "program_id":5,
                                "course_id":"action-5",
                                "action":"Анализ данных-2"
                            },
                            {   "id":6,
                                "program_id":6,
                                "course_id":"action-6",
                                "action":"Фильтрация поставщиков-3"
                            }
                        ]
                    },
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[
                            {   "id":1,
                                "program_id":1,
                                "course_id":"action-1",
                                "action":"Уменьшение расходов"
                            },
                            {   "id":2,
                                "program_id":2,
                                "course_id":"action-2",
                                "action":"Анализ данных"
                            },
                            {   "id":3,
                                "program_id":3,
                                "course_id":"action-3",
                                "action":"Фильтрация поставщиков"
                            },
                            {   "id":44,
                                "program_id":44,
                                "course_id":"action-4",
                                "action":"Уменьшение расходов-2"
                            }
                        ]
                    }
                ],
                "selectPrograms" : [
                    {
                        "id":"pr-1",
                        "program":"Персонал"

                    },

                    {
                        "id":"pr-2",
                        "program":"Мясопереработка"
                    },

                    {
                        "id":"pr-3",
                        "program":"Товары и услуги"
                    },
                    {
                        "id":"pr-4",
                        "program":"Упущенная прибыль"
                    },

                    {
                        "id":"pr-5",
                        "program":"Дельта(помесячно)"
                    },

                    {
                        "id":"pr-6",
                        "program":"Клиенты"
                    },
                    {
                        "id": "pr-7",
                        "program": "Маркетинг"
                    }

                ]
            },
            {
                "id_r":333,
                "ipr_setting_id": 33,
                "answer_final_from_int": 4,
                "answer_final_upto_int":8,
                "programs":[
                    {   "id_c":"course-2",
                        "program":"Товары и услуги",
                        "actions":[

                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            }
                        ]
                    },
                    {   "id_c":"course-3",
                        "program":"Персонал",
                        "actions":[
                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            },

                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    }
                ]
            },
            {
                "id_r":444,
                "ipr_setting_id": 44,
                "answer_final_from_int": 1,
                "answer_final_upto_int":8,
                "programs":[
                    {   "id_c":"course-2",
                        "program":"Товары и услуги",
                        "actions":[

                            {   "id":11,
                                "program_id":11,
                                "course_id":"action-10",
                                "action":"Уменьшение расходов-5"
                            },
                            {   "id":12,
                                "program_id":12,
                                "course_id":"action-11",
                                "action":"Анализ данных-6"
                            },
                            {   "id":13,
                                "program_id":13,
                                "course_id":"action-12",
                                "action":"Фильтрация поставщиков-7"
                            }
                        ]
                    }
                ]

            }
        ]


    }
]



export let actions = [
    {   "id":1,
        "course_id":"action-1",
        "action":"Уменьшение расходов"
    },
    {   "id":2,
        "course_id":"action-2",
        "action":"Анализ данных"
    },
    {   "id":3,
        "course_id":"action-3",
        "action":"Фильтрация поставщиков"
    },
    {   "id":44,
        "course_id":"action-4",
        "action":"Уменьшение расходов-2"
    },
    {   "id":5,
        "course_id":"action-5",
        "action":"Анализ данных-2"
    },
    {   "id":6,
        "course_id":"action-6",
        "action":"Фильтрация поставщиков-3"
    },
    {   "id":7,
        "course_id":"action-7",
        "action":"Уменьшение расходов-4"
    },
    {   "id":8,
        "course_id":"action-8",
        "action":"Анализ данных-5"
    },
    {   "id":9,
        "course_id":"action-9",
        "action":"Фильтрация поставщиков-5"
    },
    {   "id":11,
        "course_id":"action-10",
        "action":"Уменьшение расходов-5"
    },
    {   "id":12,
        "course_id":"action-11",
        "action":"Анализ данных-6"
    },
    {   "id":13,
        "course_id":"action-12",
        "action":"Фильтрация поставщиков-7"
    }
]

export let selectPrograms = [
    {
        "id":"pr-1",
        "program":"Персонал"

    },

    {
        "id":"pr-2",
        "program":"Мясопереработка"
    },

    {
        "id":"pr-3",
        "program":"Товары и услуги"
    },
    {
        "id":"pr-4",
        "program":"Упущенная прибыль"
    },

    {
        "id":"pr-5",
        "program":"Дельта(помесячно)"
    },

    {
        "id":"pr-6",
        "program":"Клиенты"
    },
    {
        "id": "pr-7",
        "program": "Маркетинг"
    }

]

