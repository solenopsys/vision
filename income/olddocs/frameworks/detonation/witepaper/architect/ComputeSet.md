### ComputSet 

A Detonation application is composed of multiple separate applications ComputSet that, during assembly, are
packaged into Linux containers. The deployment of these cellular applications can occur in a single cluster or across a
multi-cluster decentralized environment.

Cellular applications are either built from existing open-source programs or developed from scratch. These programs are
segmented, modified for data exchange via queues, and then encapsulated into containers ComputSet. From these
containers, deployment configurations for cellular applications in Kubernetes clusters are created. This modular
approach allows for flexibility and scalability in deployment.


### ComputFunction


### ComputSet

A ComputSet is a part of a program that contains one or several resource-intensive data processing functions (ComputFunction). If the kernel includes multiple ComputFunction, they are logically unified by a single concept. This segment of the program is packaged into a container and can be deployed in a Detonation cluster.

The ComputFunction within these ComputSet are stateless between calls. Once a computational task is completed, all
resources are freed. When a function is invoked, all the resources of the container are dedicated solely to that task.
This design ensures efficient use of resources and optimal performance for each task.

