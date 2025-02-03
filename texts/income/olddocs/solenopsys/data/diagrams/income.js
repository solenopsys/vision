option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    animation: false,
    series: [
        {
            type: 'sankey',
            bottom: '70%',
            emphasis: {
                focus: 'adjacency'
            },
            data: [
                { name: 'Incom' },



                { name: 'Hot Liqudity Fund' },
                { name: 'Development Fund' },
                { name: 'Solenopsys Fondation' },
                { name: 'Microfunds..' },

                { name: 'Developers..' },

                { name: 'Staff' },
                { name: 'Servers' },
            ],
            links: [


                { source: 'Incom', target: 'Hot Liqudity Fund', value: 50 },
                { source: 'Incom', target: 'Development Fund', value: 30 },
                { source: 'Incom', target: 'Solenopsys Fondation', value: 20 },
                { source: 'Development Fund', target: 'Developers..', value: 30 },
                { source: 'Hot Liqudity Fund', target: 'Microfunds..', value: 50 },

                { source: 'Solenopsys Fondation', target: 'Servers', value: 10 },

                { source: 'Solenopsys Fondation', target: 'Staff', value: 10 },
            ],
            orient: 'vertical',
            label: {
                position: 'top'
            },
            lineStyle: {
                color: 'source',
                curveness: 0.7
            }
        }
    ]
};