import { Container } from 'inversify'
import 'reflect-metadata'
import { bindUseCases } from './use-cases'
import { bindRepositories } from './repositories'

const container = new Container()

bindUseCases(container)
bindRepositories(container)

export default container
