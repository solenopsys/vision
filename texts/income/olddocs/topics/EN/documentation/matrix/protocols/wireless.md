### Managed Wireless

Managed Wireless is a communication protocol that operates over short distances using WiFi adapters. It allows the management of thousands of wireless sensors without overloading the network.

#### How It Works

In industrial systems, not all devices require real-time operation. Many devices can work with significant delays without affecting technical processes' performance.

The Managed Wireless protocol manages a network of devices based on a central packet scheduler, similar to how it works in cellular communication. All modules operate quietly, listening for incoming messages. When they receive a message matching their own ID, they respond within the required communication frame.

Modules are ranked by polling frequency, with higher-priority modules being polled more frequently than lower-priority ones.

Additionally, modules can connect to each other through the IUI interface. This enables them to be controlled via I2C and transmit data over WiFi, where the frame transmission speed is 1000 times faster than through I2C. Packets are received wirelessly directly within the cluster.

This technology also allows for firmware updates over wireless communication.
