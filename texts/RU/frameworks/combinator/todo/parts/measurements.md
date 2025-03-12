# Measurement

Scientific research is an essential part of the innovation process and is necessary for the creation of new
technologies. New products with improved characteristics often go beyond the current technological boundaries.
Therefore, technological startups need to conduct scientific research and development.

To assess the results of development, any tests or scientific research require measurements. In modern conditions,
experiments and measurements can and should be fully automated.

The Combinator framework provides modules for the automation of measurements and experiments.

### Strategy for Increasing the Accessibility

Our strategy revolves around designing relatively simple and cost-effective front-end modules for signal capture and its
digital conversion, leveraging our OpenSource chip technology. 

This approach is complemented by the use of OpenSource
software for data processing on existing computer accelerators like GPUs. 

Consequently, the most expensive component
becomes the computer chip for signal capture, while the rest of the system relies on software and standard computer
hardware.

### Current State of Measurement Equipment

In the realm of scientific research and the development of new equipment, a variety of measurement instruments are
employed. This includes devices like oscilloscopes, spectrum analyzers, signal generators, multimeters, etc.

Professional-grade measurement equipment can be prohibitively expensive. For instance, an oscilloscope with a bandwidth
of 40Gs per second can cost around $100,000. A similar pricing structure applies to spectrum analyzers.

Upon dissecting such an oscilloscope, it becomes apparent that its core indispensable components are the chip and the
board responsible for signal capture and digital conversion. A significant portion of the oscilloscope's cost can be
attributed to its software and data processing system.



### Advantages of Using Combinator

- Low cost of equipment
- Easy integration of devices into a single system
- All devices have a single interface
- Easy processing of data from different devices in Detonation


#### Front Modules

Front modules are lightweight measurement modules whose primary function is to capture the signal under study, convert
it into a digital form, and transmit the data for processing to a cluster.


#### Detailed Steps for Implementation:

1. Develop OpenSource chips for signal capture and digital conversion.
2. Design minimalistic front-end modules for efficient signal capture and conversion to digital form.
3. Create Open Source software modules based on Detonation for data processing on existing computing technologies.
4. Develop Open Source modules for visualizing signals on various devices based on Converged.
