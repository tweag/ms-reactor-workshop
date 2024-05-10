
# GitHub Advanced Security (GHAS) and Copilot Adoption Workshop

## Introduction 

For this part of the workshop we've provide two vulnerable applications to work with.

One is Java based, and the second is JavaScript. These can be found under:

1. VulnerableApp (Java)

2. VulnerableAppTwo (JavaScript)


## GHAS, Copilot and Tech Debt Reduction 

## AI-Powered Application Security Testing and Auto-Remediation  

## Hands-On Lab and Demonstrations


### Secrets scanning 

GitHub provides us with an built-in mechanism to scan for secrets. This includes the ability to scan for custom patterns as well as common key formats, such as Azure Function API keys.

This section of the workshop will give you hands on experience through enabing GitHub Secret scanning, using push protection rules and creating our own custom detection rule.

Configuration of Secrets scanning in GitHub, including the configuration of custom patterns is found under `Settings > Code security and analysis`.

![Workshop - Secrets scanning](./img/secretsconfig.png "Secrets configuration")

Select the `New pattern` option and then use the following regex to test for Azure Function keys.

```console

"(?i)(\b[0-9a-zA-Z]+[-]*[0-9a-zA-Z]+[-]*[0-9a-zA-Z]+[-]*[0-9a-zA-Z]+[-]*[0-9a-zA-Z]+\b)"

```

![Workshop - Secrets Regex](./img/secretsregex.png "Secrets Regex")

If you want to test the regex, you can do this by pasting in our dummy example key from `vuln.ini`, and creating a dry run. 

Select the `Publish pattern` button. Congrats, you have now added your own custom secrets detection.

We can find detected secrets under the `Security > Secret scanning` option. Switch to this screen.

If you select the detection finding, you will find some helpful information including:

1. The finding

2. Remediation steps

3. The detected location
 
If you wish, you can remove the key from your forked repository and commit and push the change.

Re-visit this screen and then choose an option from the `Close as` drop down to close out the finding, for example `Revoked`

Congrats, you've written a detection rule and closed out a finding. 



## Code-to-Cloud Security with GitHub and Microsoft Defender for Cloud 

## Wrapup
