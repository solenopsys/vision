### Detonation Elements

Many elements of Detonation replicate Kubernetes functions, while others provide unique functionality.

- **Container** – a standard OCI Linux container (based on crun).

- **Pod** – a group of containers (as in Kubernetes).

- **Cache** – a distributed cache operating at the cluster level, storing process states (based on KeyDB).

- **Flow** – a WASM microprogram that manages event flows and branching processes using a DAG structure.

- **Gate** – a gateway program designed to receive data streams at the cluster's entry point. It processes and distributes the data to Routers and balances the load between Gateways or directly to Routers. It also converts interfaces to SHOCK when needed. eBPF technology can be used for high-performance packet conversion within StreamGates. The Gate can be placed inside the cluster to receive data streams from sensors.

- **Gateway** – responsible for event routing within the cluster and between clusters of the Expansion platform. It acts as an Ingress controller in distributed computing networks.

- **Router** – a server deployed on each node that executes FLOW microprograms. It manages interactions between multiple services, distributing event streams through P2P connections using the SHOCK protocol.

- **ComputeSet** – a specialized Pod for data processing, consisting of a set of processing functions. It connects to the router via P2P connection, with data exchanged through the SHOCK protocol. The service does not store data itself but can access the cache to save or retrieve data or send events with data.

- **DataStore** – a specialized Pod for data storage. It serves as a wrapper for databases, enabling asynchronous interaction with the database through a P2P connection with the router, using the SHOCK protocol. It only works with block devices and includes a container with a file system.

- **Verify** – an acceptance test that verifies the functionality of a service function and its compliance with the specification. The service interface is tested during the build process using the Verify set.
