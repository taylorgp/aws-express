"use strict";
/// <reference path="./.sst/platform/config.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $config({
    app(input) {
        return {
            name: "aws-express",
            removal: input?.stage === "production" ? "retain" : "remove",
            home: "aws",
        };
    },
    async run() {
        const vpc = new sst.aws.Vpc("MyVpc", { bastion: true });
        const cluster = new sst.aws.Cluster("MyCluster", { vpc });
        cluster.addService("MyService", {
            loadBalancer: {
                ports: [{ listen: "80/http" }],
            },
            dev: {
                command: "node --watch index.mjs",
            },
        });
    },
});
