var data = [
    {
        name: 'Investors',
        children: [

            {
                name: 'Banks',
                value: 1,

            },
            {
                name: 'Venture',
                value: 1,
                children:[
                    {
                        name: 'Funds',
                        value:0.5
                    },
                    {
                        name: 'Angels',
                        value:0.5
                    },
                ]

            },
            {
                name: 'Leasing',
                value: 1,

            },

        ]
    },
    {
        name: 'Enterpreneurs',
        children: [

            {
                name: 'Manufacturers',
                value:1
            },
            {
                name: 'Sturtups',
                children: [
                    {
                        name: 'Robotics',
                        value: 0.33,

                    },
                    {
                        name: 'Manufacturing',
                        value:0.33,

                    },
                    {
                        name: 'AI',
                        value: 0.33,

                    }
                ]
            },
            {
                name: 'Integrators',
                value:1
            }
        ]
    },
    {
        name: 'Innovators',
        children: [
            {
                name: 'Inventors',
                value:1
            },
            {
                name: 'Scientists',
                value:1,
            }, {
                name: 'Experts',
                value:1
            }
        ]
    },
    {
        name: 'Creators',
        children: [
            {
                name: 'Engineers',

                children: [
                    {
                        name: 'Electronic',
                        value:0.33,
                    },
                    {
                        name: 'Mechanics',
                        value:0.33,
                    }, {
                        name: 'Optical',
                        value:0.33,
                    }
                ]
            }, {
                name: 'Developers',

                children: [
                    {
                        name: 'Frontend',
                        value: 0.33,
                    },
                    {
                        name: 'Backend',
                        value: 0.33,
                    },
                    {
                        name: 'Embedded',
                        value: 0.33,
                    },

                ]
            }, {
                name: 'Designers',

                children: [
                    {
                        name: 'UI/UX',
                        value:0.5,
                    },
                    {
                        name: 'Industrial',
                        value:0.5,
                    },
                ]
            }
        ]
    }
];

option = {
    series: {
        type: 'sunburst',
        emphasis: {
            focus: 'ancestor'
        },
        data: data,
        radius: [0, '905'],
        label: {
            rotate: 'radial'
        },
        levels:[
            {
            },
            {
                r0: '35%',
                r: '55%',
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    padding: 5,
                    rotate: 'tangential'
                }
            },
            {
                r0: '55%',
                r: '65%',
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    padding: 5,
                    rotate: 'tangential'
                }
            }, {
                r0: '65%',
                r: '67%',
                itemStyle: {
                    borderWidth: 2

                },
                label: {
                    padding: 5,
                    position: 'outside',
                }
            },
        ]
    }

};

